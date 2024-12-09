'use client'

import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import { Session, Message } from '@/src/types'

type Data =
  | {
      action: 'connect' | 'disconnect'
      data: {
        activeUserIds: string[]
      }
    }
  | {
      action: 'message'
      data: {
        activeUserIds: string[]
        messages: Message
      }
    }

interface SocketData {
  activeUserIds: string[]
  messages: Message[]
  sendContent: (content: string, type: string) => void
}

export const useLiveChat = (teamCode: string, userId: string) => {
  const endpoint = `${process.env.NEXT_PUBLIC_LIVE_CHAT_WEBSOCKET}?team_code=${teamCode}&user_id=${userId}`

  const { data } = useSWRSubscription(endpoint, (key, { next }: SWRSubscriptionOptions<SocketData, Error>) => {
    const client = new WebSocket(key)

    client.addEventListener('open', async () => {
      const activeUserIds = await fetchActiveUsers(teamCode)

      const messages = await fetchMessages(teamCode)

      // メッセージを送信する関数
      const sendContent = (content: string, type: string) => {
        const body = {
          action: 'message',
          team_code: teamCode,
          user_id: userId,
          content,
          content_type: type,
        }
        client.send(JSON.stringify(body))
      }

      next(undefined, { activeUserIds, messages, sendContent })
    })

    client.addEventListener('message', (event) => {
      const d = JSON.parse(event.data) as Data

      if (d.action === 'connect' || d.action === 'disconnect') {
        next(undefined, (prev) => {
          return prev && { ...prev, activeUserIds: d.data.activeUserIds }
        })
      }

      if (d.action === 'message') {
        next(undefined, (prev) => {
          return prev && { ...prev, activeUserIds: d.data.activeUserIds, messages: [...prev.messages, d.data.messages] }
        })
      }
    })

    client.addEventListener('error', () => {})

    return () => {
      if (client.readyState !== client.CLOSING) {
        client?.close()
      }
    }
  })

  return {
    activeUserIds: data?.activeUserIds ?? [],
    messages: data?.messages ?? [],
    sendContent: data?.sendContent,
  }
}

/** 同じteam_codeを持つアクティブなユーザーを取得 */
async function fetchActiveUsers(teamCode: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/teams/${teamCode}/active-users`)
  const data = (await res.json()) as Session[]
  const ids = data.map(({ user_id }) => user_id)
  return ids
}

/** 同じteam_codeのメッセージ履歴を取得 */
async function fetchMessages(teamCode: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/teams/${teamCode}/messages`)
  const data = (await res.json()) as Message[]
  return data
}
