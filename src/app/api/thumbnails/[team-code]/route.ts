import { NextResponse } from 'next/server'
import { Readable } from 'stream'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { ThumbnailResponse } from '@/src/types/api'
import { streamS3ObjectToString } from '@/src/utils/stream'

interface Params {
  'team-code': string
  'user-id': string
}

const s3 = new S3Client({ region: process.env.AWS_REGION })

export async function GET(_: Request, { params }: { params: Params }): Promise<NextResponse<ThumbnailResponse>> {
  const listCommand = new ListObjectsV2Command({
    Bucket: 'live-chat-user-thumbnail',
    Prefix: params['team-code'],
  })

  try {
    const { Contents = [] } = await s3.send(listCommand)

    const thumbnails = await Contents.reduce<Promise<{ [key: string]: string }>>(async (prevPromise, object) => {
      // フォルダ（ex. us-tech/）は画像では無いので除外する
      if (object.Size === 0) return prevPromise

      const prev = await prevPromise

      // ex. us-tech/us-test1.png -> us-test1
      const key = (object.Key as string).replace(/^.*\/([^/]+)\.[^.]+$/, '$1')

      try {
        const getObjectCommand = new GetObjectCommand({
          Bucket: 'live-chat-user-thumbnail',
          Key: object.Key as string,
        })

        const response = await s3.send(getObjectCommand)
        const imageBase64 = await streamS3ObjectToString(response.Body as Readable)
        return { ...prev, [key]: `data:${response.ContentType};base64,${imageBase64}` }
      } catch (e) {
        console.error(e)
        return { ...prev, [key]: '/images/thumbnail.webp' }
      }
    }, Promise.resolve({}))

    return NextResponse.json({ data: thumbnails })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to get thumbnail.' })
  }
}
