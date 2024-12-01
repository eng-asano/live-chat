// import { NextResponse } from 'next/server'
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
// import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
// import { User } from '@/src/types/dynamoDB'

// interface Params {
//   'team-code': string
//   'user-id': string
// }

// const client = DynamoDBDocumentClient.from(
//   new DynamoDBClient({
//     region: process.env.NEXT_AWS_REGION,
//     endpoint: process.env.NEXT_DYNAMODB_LOCAL,
//   })
// )

// export async function GET(_: Request, { params }: { params: Params }) {
//   const command = {
//     TableName: 'users',
//     Key: {
//       team_code: params['team-code'],
//       user_id: params['user-id'],
//     },
//   }

//   try {
//     const data = await client.send(new GetCommand(command))
//     if (!data.Item) return NextResponse.json({ error: 'Data does not exist.' })

//     const item: Record<keyof User, User[keyof User]> = data.Item
//     return NextResponse.json(item)
//   } catch (e) {
//     console.error(e)
//     return NextResponse.json({ error: 'Failed to get data.' })
//   }
// }
