import Image from 'next/image'
import { getUserInfo } from '@/src/actions/auth'
import { ThumbnailResponse } from '@/src/types/api'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export const Profile = async () => {
  const user = await getUserInfo()

  if (!user) return <></>

  return (
    <section className={styles.root}>
      <Thumbnail teamCode={user['custom:team_code']} userId={user['cognito:username']} />
      <UserName name={user.name} post={user['custom:post']} />
    </section>
  )
}

interface UserNameProps {
  name: string
  post: string
}

const UserName = ({ name, post }: UserNameProps) => {
  return (
    <>
      <h2 className={styles.name}>{name}</h2>
      <span className={styles.post}>{post}</span>
    </>
  )
}

interface ThumbnailProps {
  teamCode: string
  userId: string
}

const Thumbnail = async ({ teamCode, userId }: ThumbnailProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/thumbnails/${teamCode}`, {
    headers: {
      'X-Source': 'server',
    },
  })

  const { data } = (await res.json()) as ThumbnailResponse

  if (!data) return <></>

  return <Image src={data[userId]} width={120} height={120} alt="profile thumbnail" className={styles.thumbnail} />
}

const styles = {
  root: flex({
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  }),
  thumbnail: css({
    marginTop: '18px',
    border: '2px solid #fff',
    borderRadius: '50%',
  }),
  name: css({
    marginTop: '16px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }),
  post: css({
    marginTop: '8px',
  }),
}
