'use client'

import { useMediaQuery } from 'react-responsive'

export const useMedia = () => {
  const isSP = useMediaQuery({ query: '(max-width: 639px)' })

  return { isSP }
}
