'use client'

import { useState } from 'react'
import useSWRSubscription from 'swr/subscription'
import { Session } from '@/src/types'

interface Data {
  action: 'connect'
  activeUserIds: string[]
}

export const useLiveChat = (teamCode: string, userId: string) => {
  const [activeUserIds, setActiveUserIds] = useState<string[]>([])

  const endpoint = `${process.env.NEXT_PUBLIC_LIVE_CHAT_WEBSOCKET}?team_code=${teamCode}&user_id=${userId}`

  useSWRSubscription(endpoint, (key) => {
    const socket = new WebSocket(key)

    socket.addEventListener('open', async () => {
      // 同じteam_codeを持つアクティブなユーザーを取得
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/teams/${teamCode}/active-users`)
      const data = (await res.json()) as Session[]
      const ids = data.map(({ user_id }) => user_id)
      setActiveUserIds(ids)
    })

    socket.addEventListener('message', (event) => {
      const d = JSON.parse(event.data) as Data

      if (d.action === 'connect' || d.action === 'disconnect') {
        setActiveUserIds(d.activeUserIds)
      }
    })

    socket.addEventListener('error', () => {})

    return () => {
      // 接続を切断
      socket.close()
    }
  })

  return { activeUserIds }
}
