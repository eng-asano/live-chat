import { NextResponse } from 'next/server'
import { Readable } from 'stream'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { ThumbnailResponse } from '@/src/types/api'
import { streamS3ObjectToString } from '@/src/utils/stream'

interface Params {
  'team-code': string
  'user-id': string
}

const s3 = new S3Client({ region: process.env.NEXT_AWS_REGION })

export async function GET(_: Request, { params }: { params: Params }): Promise<NextResponse<ThumbnailResponse>> {
  const command = new GetObjectCommand({
    Bucket: 'live-chat-user-thumbnail',
    Key: `${params['team-code']}/${params['user-id']}`,
  })

  try {
    const response = await s3.send(command)
    const imageBase64 = await streamS3ObjectToString(response.Body as Readable)
    return NextResponse.json({ img: `data:${response.ContentType};base64,${imageBase64}` })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ img: '/images/thumbnail.webp', error: 'Failed to get thumbnail.' })
  }
}
