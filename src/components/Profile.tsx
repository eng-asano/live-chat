'use server'

import Image from 'next/image'
import { getUserInfo } from '@/src/actions/auth'
import { ThumbnailResponse } from '@/src/types/api'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export const Profile = async () => {
  return (
    <section className={styles.root}>
      <Thumbnail />
      <UserName />
    </section>
  )
}

const UserName = async () => {
  const user = await getUserInfo()

  if (!user) return <></>

  return (
    <>
      <h2 className={styles.name}>{user.name}</h2>
      <span className={styles.post}>{user['custom:post']}</span>
    </>
  )
}

const Thumbnail = async () => {
  const user = await getUserInfo()

  if (!user) return <></>

  // ex. us-tech/us-test1.png
  const thumbnailKey = user['custom:thumbnail_key']

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/thumbnails/${thumbnailKey}`)
  const { img } = (await res.json()) as ThumbnailResponse

  return <Image src={img} width={120} height={120} alt="profile thumbnail" className={styles.thumbnail} />
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
