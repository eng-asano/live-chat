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

export async function GET(_: Request, { params }: { params: Params }) {
  const command = new ScanCommand({
    TableName: 'sessions',
    FilterExpression: '#team_code = :team_code',
    ExpressionAttributeNames: {
      '#team_code': 'team_code',
      '#user_id': 'user_id',
    },
    ExpressionAttributeValues: {
      ':team_code': params['team-code'],
    },
    ProjectionExpression: '#team_code, #user_id',
  })

  try {
    const res = await client.send(command)
    return NextResponse.json(res.Items)
  } catch (e) {
    // console.error(e)
    return NextResponse.json({ error: 'Failed to active user data.' })
  }
}
