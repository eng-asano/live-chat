'use client'

import useSWRSubscription, { SWRSubscriptionOptions } from 'swr/subscription'
import Cookies from 'js-cookie'
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
  hasMoreMessage: boolean
  sendContent: (content: string, type: string) => { error: string } | void
  loadPrevMessages: () => Promise<void>
}

export const useLiveChat = (teamCode: string, userId: string) => {
  const idToken = Cookies.get('idToken')

  const endpoint = `${process.env.NEXT_PUBLIC_LIVE_CHAT_WEBSOCKET}?team_code=${teamCode}&user_id=${userId}&id_token=${idToken}`

  const { data } = useSWRSubscription(endpoint, (key, { next }: SWRSubscriptionOptions<SocketData, Error>) => {
    const client = new WebSocket(key)

    client.addEventListener('open', async () => {
      const activeUserIds = await fetchActiveUsers(teamCode)

      const { messages, hasMoreMessage } = await fetchMessages(teamCode)

      // メッセージを送信する関数
      const sendContent = (content: string, type: string) => {
        const body = {
          action: 'message',
          team_code: teamCode,
          user_id: userId,
          content,
          content_type: type,
        }

        const ready = client.readyState
        if (ready === client.CLOSING || ready === client.CLOSED) {
          return { error: '通信エラーが発生しました。ページを再読み込みしてください。' }
        }

        client.send(JSON.stringify(body))
      }

      // 過去のメッセージを読み込む
      const loadPrevMessages = async () => {
        next(undefined, async (prev) => {
          const createdAt = prev?.messages[0]?.created_at
          if (!createdAt) return prev

          const { messages, hasMoreMessage } = await fetchMessages(teamCode, createdAt)

          return {
            ...prev,
            hasMoreMessage,
            messages: [...messages, ...prev.messages],
          }
        })
      }

      // 接続確立時の初期値
      next(undefined, {
        activeUserIds,
        messages: messages.reverse(), // 初期表示は昇順で表示する
        hasMoreMessage,
        sendContent,
        loadPrevMessages,
      })
    })

    client.addEventListener('message', (event) => {
      const d = JSON.parse(event.data) as Data

      next(undefined, (prev) => {
        if (!prev) return prev

        switch (d.action) {
          case 'connect':
          case 'disconnect':
            // ログイン中のユーザーIDを取得
            return {
              ...prev,
              activeUserIds: d.data.activeUserIds,
            }
          case 'message':
            // ログイン中のユーザーIDと他のユーザーからのメッセージを取得
            return {
              ...prev,
              activeUserIds: d.data.activeUserIds,
              messages: [...prev.messages, d.data.messages],
            }
          default:
            return prev
        }
      })
    })

    return () => {
      // 接続が確立していない状態でのcloseを防止
      if (client?.readyState !== client?.CLOSING) {
        client?.close()
      }
    }
  })

  return {
    activeUserIds: data?.activeUserIds ?? [],
    messages: data?.messages,
    hasMoreMessage: data?.hasMoreMessage || false,
    sendContent: data?.sendContent,
    loadPrevMessages: data?.loadPrevMessages,
  }
}

/** 同じteam_codeを持つアクティブなユーザーを取得 */
async function fetchActiveUsers(teamCode: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/teams/${teamCode}/active-users`)
  const data = (await res.json()) as Session[]

  return data.map(({ user_id }) => user_id)
}

/** 同じteam_codeのメッセージ履歴を取得 */
async function fetchMessages(teamCode: string, createdAt?: string) {
  // 指定した作成日以前のメッセージを取得するためクエリパラメーター
  // 空値の場合は直近のメッセージを取得
  const query = createdAt ? `?lastMessageAt=${createdAt}` : ''

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/${teamCode}/messages${query}`)
  const data = await res.json()

  return data as { messages: Message[]; hasMoreMessage: boolean }
}
