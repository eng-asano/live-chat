import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

interface Params {
  'team-code': string
}

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env.AWS_REGION,
  })
)

const messagesTable = 'messages'

export async function GET(_: Request, { params }: { params: Params }) {
  const command = new ScanCommand({
    TableName: messagesTable,
    FilterExpression: '#team_code = :team_code',
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
  })

  try {
    const res = await client.send(command)
    return NextResponse.json(res.Items)
  } catch {
    return NextResponse.json({ error: 'Failed to active user data.' })
  }
}
