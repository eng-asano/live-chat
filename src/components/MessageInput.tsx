'use client'

import { useState, useCallback, useEffect, memo } from 'react'
import { MdSend } from 'react-icons/md'
import { useLiveChat, useClient, useMedia } from '@/src/hooks'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

interface Props {
  teamCode: string
  userId: string
}

export const MessageInput = memo(({ teamCode, userId }: Props) => {
  const [input, setInput] = useState('')
  const [lineLength, setLineLength] = useState(1)

  const { isClient } = useClient()
  const { sendContent } = useLiveChat(teamCode, userId)
  const { isSP } = useMedia()

  const sendMessage = useCallback(() => {
    sendContent?.(input, 'text')
    setInput('')
  }, [input, sendContent])

  const changeInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    const lines = value.split(/\r?\n/)

    setInput(value)
    if (lines.length < 6) setLineLength(lines.length)
  }, [])

  if (!isClient) return <></>

  return (
    <div className={styles.root}>
      <textarea
        className={styles.textarea}
        style={{ height: isSP ? 36 + 14 * (lineLength - 1) : 42 + 14 * (lineLength - 1) }}
        value={input}
        onChange={changeInput}
        placeholder="Send a message"
      />
      <button className={styles.btn}>
        <MdSend className={styles.icon} size={24} onClick={sendMessage} />
      </button>
    </div>
  )
})

MessageInput.displayName = 'MessageInput'

const styles = {
  root: flex({}),
  textarea: css({
    resize: 'none',
    w: '100%',
    p: '8px',
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    bgColor: 'background.light',
    borderRadius: '8px 0 0 8px',
    outline: 'none',
    overflow: 'hidden',

    sm: {
      p: '12px',
      lineHeight: '1.5rem',
    },
  }),
  btn: css({
    p: '6px',
    bgColor: 'background.light',
    borderRadius: '0 8px 8px 0',
    outlineColor: 'primary.main',

    sm: {
      p: '8px',
    },
  }),
  icon: css({
    color: 'primary.main',
  }),
}
