import { redirect } from 'next/navigation'
import { verifyIdToken } from '@/src/actions/auth'
import { Messages, MessageInput } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/login')

  return (
    <div className={styles.root}>
      <div className={styles.scroll}>
        <div className={styles.messages}>
          <Messages />
        </div>
      </div>
      <div className={styles.input}>
        <MessageInput />
      </div>
    </div>
  )
}

const styles = {
  root: flex({
    direction: 'column',
    justify: 'space-between',
    w: '100%',
    m: '0 auto',
  }),
  scroll: css({
    width: '100%',
    height: 'calc(100dvh - 96px)',
    padding: '32px',
    overflowY: 'auto',
  }),
  messages: css({
    position: 'relative',
    maxW: '1280px',
    m: '0 auto',
  }),
  input: css({
    position: 'sticky',
    w: 'calc(100% - 64px)',
    maxW: '1280px',
    m: '0 auto',
    pb: '24px',
  }),
}
