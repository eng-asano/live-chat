import { redirect } from 'next/navigation'
import { verifyIdToken } from '@/src/actions/auth'
import { css } from '@/styled-system/css'
import { Messages } from '@/src/components'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/login')

  return (
    <div className={styles.root}>
      <Messages />
    </div>
  )
}

const styles = {
  root: css({
    maxW: '1280px',
    m: '0 auto',
    borderRadius: '8px',
  }),
}
