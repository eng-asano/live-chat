'use client'

import { useState, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import { MdSend, MdHighlightOff } from 'react-icons/md'
import * as Toast from '@radix-ui/react-toast'
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
  const [openToast, setOpenToast] = useState(false)
  const [error, setError] = useState<string>()

  const { isClient } = useClient()
  const { sendContent } = useLiveChat(teamCode, userId)
  const { isSP } = useMedia()

  const sendMessage = useCallback(() => {
    const res = sendContent?.(input, 'text')

    if (res?.error) {
      setError(res.error)
      setOpenToast(true)
      return
    }

    setInput('')
    setLineLength(1)
  }, [input, sendContent])

  const changeInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    const lines = value.split(/\r?\n/)

    setInput(value)
    if (lines.length < 6) setLineLength(lines.length)
  }, [])

  const closeToast = useCallback(async (open: boolean) => {
    if (open) return
    setOpenToast(false)
    await new Promise((r) => setTimeout(r, 1000))
    setError(undefined)
  }, [])

  if (!isClient) return <></>

  const baseHeight = isSP ? 36 : 42

  return (
    <div className={styles.root}>
      <textarea
        className={styles.textarea}
        style={{ height: baseHeight + 14 * (lineLength - 1) }}
        value={input}
        onChange={changeInput}
        placeholder="Send a message"
      />
      <button className={styles.btn} disabled={input.trim() === ''}>
        <MdSend size={24} onClick={sendMessage} />
      </button>
      {isClient &&
        createPortal(
          <Toast.Provider swipeDirection="right">
            <Toast.Root
              open={openToast}
              className={styles.toast.root}
              defaultOpen={false}
              duration={2000}
              onOpenChange={closeToast}
            >
              <MdHighlightOff size={28} className={styles.toast.icon} />
              <Toast.Description>{error}</Toast.Description>
            </Toast.Root>
            <Toast.Viewport className={styles.toast.viewport} />
          </Toast.Provider>,
          document.body
        )}
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

    '& svg': {
      color: 'primary.main',
    },

    _disabled: {
      '& svg': {
        color: 'gray.400',
      },
    },
  }),
  toast: {
    viewport: css({
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      minW: '320px',
      zIndex: '10',
    }),
    root: flex({
      align: 'center',
      columnGap: '8px',
      h: '60px',
      p: '8px',
      fontWeight: 'bold',
      bgColor: '#fff',
      borderLeftWidth: '4px',
      borderColor: 'error.main',
      borderRadius: '4px',
      boxShadow: '0px 10px 20px',
      boxShadowColor: 'boxShadow.main',
      '&[data-state="open"]': {
        animation: 'toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      '&[data-state="closed"]': {
        animation: 'toastOut 0.5s ease-in',
      },
    }),
    icon: css({
      color: 'error.main',
    }),
  },
}
