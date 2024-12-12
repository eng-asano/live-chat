'use client'

import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { activeNavAtom, ActiveNav } from '@/src/store'
import { Messages, MessageInput } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

interface Props {
  teamCode: string
  userId: string
}

export const Chat = ({ teamCode, userId }: Props) => {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom)

  const closeChat = useCallback(() => {
    setActiveNav(undefined)
  }, [setActiveNav])

  return (
    <div className={styles.root(activeNav)}>
      <header className={styles.header}>
        <button onClick={closeChat}>
          <MdKeyboardArrowLeft className={styles.icon} size={40} />
        </button>
        <h1 className={styles.title}>Live&thinsp;Chat</h1>
      </header>
      <Messages teamCode={teamCode} userId={userId} />
      <div className={styles.shadow}>
        <div className={styles.input}>
          <MessageInput teamCode={teamCode} userId={userId} />
        </div>
      </div>
    </div>
  )
}

const styles = {
  root: (activeNav: ActiveNav) =>
    css({
      pos: 'relative',
      flexShrink: '0',
      w: '100%',
      bg: 'white',
      translate: activeNav === 'chat' ? '-100% 0' : '100% 0',
      transition: 'translate 0.5s ease-in-out',

      sm: {
        w: 'calc(100% - 320px)',
        translate: '0 0',
      },
    }),
  shadow: css({
    position: 'absolute',
    inset: 'auto 0 0 0',
    bgColor: '#fff',
    boxShadow: '6px 10px 16px',
    boxShadowColor: 'boxShadow.main',
  }),
  input: css({
    w: 'calc(100% - 64px)',
    maxW: '1280px',
    m: '0 auto',
    p: '24px 0',
  }),
  header: flex({
    align: 'center',
    h: '48px',
    p: '0 16px',
    boxShadow: '6px -6px 16px',
    boxShadowColor: 'boxShadow.main',

    sm: {
      display: 'none',
    },
  }),
  title: css({
    w: '100%',
    mr: '40px',
    color: 'primary.main',
    fontFamily: 'fira',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  }),
  icon: css({
    color: 'primary.main',
  }),
}
