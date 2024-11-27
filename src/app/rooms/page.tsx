import { redirect } from 'next/navigation'
import { verifyIdToken } from '@/src/actions/auth'
import { Messages, MessageInput } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/sign-in')

  return (
    <div className={styles.root}>
      <div className={styles.scroll}>
        <div className={styles.messages}>
          <Messages />
        </div>
      </div>
      <div className={styles.shadow}>
        <div className={styles.input}>
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

const styles = {
  root: flex({
    position: 'relative',
    direction: 'column',
    justify: 'space-between',
    w: '100%',
    m: '0 auto',
  }),
  scroll: css({
    w: '100%',
    h: 'calc(100dvh - 90px)',
    p: '32px',
    overflowY: 'scroll',
  }),
  messages: css({
    position: 'relative',
    maxW: '1280px',
    m: '0 auto',
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
}
