import { Readable } from 'stream'

/** S3オブジェクトをストリームで文字列に変換 */
export const streamS3ObjectToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')))
  })
}
