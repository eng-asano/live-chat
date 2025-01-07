'use client'

import { memo } from 'react'
import Image from 'next/image'
import { ActivePoint } from '@/src/components'
import { useLiveChat, useThumbnail } from '@/src/hooks'
import { UserInfo } from '@/src/types/cognito'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'

interface MembersProps {
  teamCode: string
  userId: string
  members: UserInfo[]
}

export const Members = memo(({ teamCode, userId, members }: MembersProps) => {
  const { activeUserIds } = useLiveChat(teamCode, userId)

  const { thumbnails } = useThumbnail(teamCode)

  // 条件： アクティブ状態 > team_codeの昇順
  const sortedMembers = members.sort((a, b) => {
    const aIsActive = activeUserIds.includes(a['cognito:username'])
    if (aIsActive) return -1

    const bIsActive = activeUserIds.includes(b['cognito:username'])
    if (bIsActive) return 1

    return a['cognito:username'].localeCompare(b['cognito:username'])
  })

  if (!thumbnails) return <></>

  return (
    <div className={styles.root}>
      {sortedMembers.map((m) => (
        <Member
          key={m['cognito:username']}
          info={m}
          img={thumbnails[m['cognito:username']]}
          isActive={activeUserIds.includes(m['cognito:username'])}
        />
      ))}
    </div>
  )
})

Members.displayName = 'Members'

interface MemberProps {
  info: UserInfo
  img: string
  isActive: boolean
}

const Member = ({ info, img, isActive }: MemberProps) => {
  return (
    <div className={styles.member}>
      <Image src={img} width={48} height={48} alt="member thumbnail" className={styles.thumbnail} />
      <section className={styles.info}>
        <div className={styles.part}>
          <h3>{info.name}</h3>
          <ActivePoint isActive={isActive} />
        </div>
        <span className={styles.memo}>{info['custom:post']}</span>
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    direction: 'column',
    rowGap: '32px',
    mt: '24px',
    mr: '-12px',
    pb: '12px',
    pr: '12px',
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
    w: '100%',
    fontWeight: 'bold',
  }),
  part: flex({
    justify: 'space-between',
    align: 'center',
    columnGap: '8px',
  }),
  memo: css({
    fontSize: '0.9rem',
  }),
  point: css({
    w: '8px',
    h: '8px',
    borderRadius: '50%',
    bg: 'accent.main',
  }),
}
