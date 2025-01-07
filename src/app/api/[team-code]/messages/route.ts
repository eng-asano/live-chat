import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

interface Params {
  params: {
    'team-code': string
  }
}

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env.AWS_REGION,
  })
)

const messagesTable = 'messages'

export async function GET(req: Request, { params }: Params) {
  const { searchParams } = new URL(req.url)
  const lastMessageAt = searchParams.get('lastMessageAt')

  // 指定した作成日以前のメッセージを取得するためパラメーターを構築
  // undefinedの場合は直近のメッセージを取得
  const lastEvaluatedKey = lastMessageAt ? { team_code: params['team-code'], created_at: lastMessageAt } : undefined

  const command = new QueryCommand({
    TableName: messagesTable,
    KeyConditionExpression: '#team_code = :team_code',
    ExpressionAttributeNames: {
      '#team_code': 'team_code',
      '#created_at': 'created_at',
      '#content': 'content',
      '#content_type': 'content_type',
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':team_code': params['team-code'],
    },
    ProjectionExpression: '#team_code, #created_at, #content, #content_type, #user_id',
    Limit: 50,
    ScanIndexForward: false, // 降順
    ExclusiveStartKey: lastEvaluatedKey,
  })

  try {
    const res = await client.send(command)
    return NextResponse.json({ messages: res.Items, hasMoreMessage: !!res.LastEvaluatedKey })
  } catch {
    return NextResponse.json({ error: 'Failed to active user data.' })
  }
}
