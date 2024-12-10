'use client'

import useSWR from 'swr'
import { ThumbnailResponse } from '@/src/types/api'

export const useThumbnail = (teamCode: string) => {
  const { data } = useSWR<ThumbnailResponse>(
    `${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/thumbnails/${teamCode}`,
    fetcher,
    { revalidateOnFocus: false }
  )

  return { thumbnails: data?.data }
}

async function fetcher(url: string): Promise<ThumbnailResponse> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}
