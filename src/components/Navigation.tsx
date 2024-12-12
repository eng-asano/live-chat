'use client'

import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { useMediaQuery } from 'react-responsive'
import { activeNavAtom } from '@/src/store'
import { signOut } from '@/src/actions/auth'
import { useClient } from '@/src/hooks'
import { IconButton } from '@/src/components'
import { flex } from '@/styled-system/patterns'

export const Navigation = () => {
  const [activeNav, setActiveNav] = useAtom(activeNavAtom)

  const { isClient } = useClient()

  const isPCorTablet = useMediaQuery({ query: '(min-width: 640px)' })

  const switchToChat = useCallback(() => {
    setActiveNav('chat')
  }, [setActiveNav])

  if (!isClient) return <></>

  // PCまたはTabletの場合、チャット画面を常に表示する
  // SPのみユーザー画面とチャット画面を切り替えて表示する
  const isChatActive = isPCorTablet || activeNav === 'chat'

  return (
    <nav className={styles.root}>
      <IconButton icon="chat" isActive={isChatActive} onClick={switchToChat}>
        Chat
      </IconButton>
      <form className={styles.form} action={signOut}>
        <IconButton icon="sign-out">Sign Out</IconButton>
      </form>
    </nav>
  )
}

const styles = {
  root: flex({
    justifyContent: 'space-evenly',
    mt: 'auto',
    p: '12px 0',
    borderTop: '1px solid #ececec',
  }),
  form: flex({
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto 0',
  }),
}
