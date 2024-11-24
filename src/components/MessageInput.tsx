'use client'

import { useState, useCallback } from 'react'
import { MdSend } from 'react-icons/md'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export const MessageInput = () => {
  const [input, setInput] = useState('')
  const [lineLength, setLineLength] = useState(1)

  const changeInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    const lines = value.split(/\r?\n/)

    setInput(value)
    if (lines.length < 6) setLineLength(lines.length)
  }, [])

  return (
    <form className={styles.root}>
      <textarea
        className={styles.textarea}
        style={{ height: 42 + 14 * (lineLength - 1) }}
        value={input}
        onChange={changeInput}
        placeholder="Send a message"
      />
      <button className={styles.btn}>
        <MdSend className={styles.icon} size={24} />
      </button>
    </form>
  )
}

const styles = {
  root: flex({}),
  textarea: css({
    resize: 'none',
    w: '100%',
    p: '12px',
    fontSize: '1.2rem',
    lineHeight: '1.5rem',
    bgColor: 'background.light',
    borderRadius: '8px 0 0 8px',
    outline: 'none',
  }),
  btn: css({
    p: '8px',
    bgColor: 'background.light',
    borderRadius: '0 8px 8px 0',
    outlineColor: 'primary.main',
  }),
  icon: css({
    color: 'primary.main',
  }),
}
