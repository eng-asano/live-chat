import Image from 'next/image'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

export const Members = () => {
  return (
    <div className={styles.root}>
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
    </div>
  )
}

const Member = () => {
  return (
    <div className={styles.member}>
      <Image src="/images/woman.png" width={54} height={54} alt="member thumbnail" className={styles.thumbnail} />
      <section className={styles.info}>
        <h3>Olivia Smith</h3>
        <span className={styles.memo}>Software Engineer</span>
        <div className={styles.part}>
          <span className={styles.memo}>LL&thinsp;10:35</span>
          <div className={styles.point}></div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    direction: 'column',
    rowGap: '32px',
    marginTop: '24px',
    marginRight: '-12px',
    paddingRight: '12px',
    overflowY: 'auto',
  }),
  member: flex({
    columnGap: '12px',
  }),
  thumbnail: css({
    flexShrink: '0',
    border: '2px solid #fff',
    borderRadius: '50%',
  }),
  info: flex({
    direction: 'column',
    rowGap: '8px',
    width: '100%',
    fontWeight: 'bold',
  }),
  part: flex({
    align: 'center',
    columnGap: '8px',
  }),
  memo: css({
    fontSize: '0.85rem',
  }),
  point: css({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'accent.main',
  }),
}
