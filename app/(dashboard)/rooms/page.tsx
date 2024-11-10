import { redirect } from 'next/navigation'
import { MdFace, MdFace3, MdFace4, MdFace6 } from 'react-icons/md'
import { verifyIdToken } from '@/app/_actions/auth'
import { Avatar, Card } from '@/app/_components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export default async function Rooms() {
  const res = await verifyIdToken()
  if (res.status === 'error') redirect('/login')

  return (
    <div className={styles.root}>
      <section className={styles.card}>
        <Card>
          <h2 className={styles.title}>Room 1</h2>
          <span className={styles.sum}>5</span>
          <div className={styles.avatars}>
            <Avatar>
              <MdFace size={24} />
            </Avatar>
            <Avatar>
              <MdFace4 size={24} />
            </Avatar>
            <Avatar>
              <MdFace4 size={24} />
            </Avatar>
            <Avatar>
              <MdFace4 size={24} />
            </Avatar>
            <Avatar>
              <MdFace4 size={24} />
            </Avatar>
          </div>
        </Card>
      </section>
      <section className={styles.card}>
        <Card>
          <h2 className={styles.title}>Room 2</h2>
          <span className={styles.sum}>2</span>
          <div className={styles.avatars}>
            <Avatar>
              <MdFace3 size={24} />
            </Avatar>
            <Avatar>
              <MdFace6 size={24} />
            </Avatar>
          </div>
        </Card>
      </section>
      <section className={styles.card}>
        <Card>
          <h2 className={styles.title}>Room 3</h2>
          <span className={styles.sum}>0</span>
          <div className={styles.avatars}>No Users</div>
        </Card>
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    wrap: 'wrap',
    gap: '48px',
    width: '100%',
    maxWidth: '1680px',
    margin: '0 auto',
  }),
  card: css({
    width: '100%',
    md: {
      width: 'calc(50% - 24px)',
    },
    xl: {
      width: 'calc(33.3% - 32px)',
      maxWidth: '600px',
    },
  }),
  avatars: flex({
    columnGap: '16px',
    fontSize: '0.9rem',
    color: 'gray.500',
  }),
  title: css({
    fontWeight: 'bold',
  }),
  sum: css({
    fontSize: '3rem',
    fontWeight: 'bold',
    lineHeight: '3rem',
  }),
}
