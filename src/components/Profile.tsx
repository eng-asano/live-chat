import Image from 'next/image'
import { ThumbnailResponse } from '@/src/types/api'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export const Profile = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/thumbnails/us-tech/test1`)
  const { img } = (await res.json()) as ThumbnailResponse

  return (
    <section className={styles.root}>
      <Image src={img} width={120} height={120} alt="profile thumbnail" className={styles.thumbnail} />
      <h2 className={styles.name}>David Peters</h2>
      <span className={styles.post}>Senior Developer</span>
    </section>
  )
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
