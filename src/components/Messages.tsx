'use client'

import { memo } from 'react'
import Image from 'next/image'
import { useLiveChat, useThumbnail } from '@/src/hooks'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { separator, messageText } from '@/styled-system/recipes'

interface MessagesProps {
  teamCode: string
  userId: string
}

export const Messages = memo(({ teamCode, userId }: MessagesProps) => {
  const { messages } = useLiveChat(teamCode, userId)

  const { thumbnails } = useThumbnail(teamCode)

  if (!thumbnails) return <></>

  return (
    <div className={styles.root}>
      <div className={`${separator()} ${styles.separator}`}>Today</div>
      {messages?.map((m, i) =>
        m.user_id === userId ? (
          <UserMessage key={m.created_at} text={m.content} />
        ) : m.user_id === messages?.[i - 1]?.user_id ? (
          // 同じユーザーからの連続投稿の場合はメッセージのみ表示
          <MemberMessage key={m.created_at} text={m.content} />
        ) : (
          <ImageMessage key={m.created_at} text={m.content} thumbnail={thumbnails[m.user_id]} />
        )
      )}
    </div>
  )
})

Messages.displayName = 'Messages'

interface MessageProps {
  text: string
}

const UserMessage = ({ text }: MessageProps) => {
  return <p className={`${messageText()} ${styles.userText}`}>{text}</p>
}

const MemberMessage = ({ text }: MessageProps) => {
  return <p className={`${messageText()} ${styles.memberText}`}>{text}</p>
}

const ImageMessage = ({ text, thumbnail }: { text: string; thumbnail: string }) => {
  return (
    <div className={styles.message}>
      <div className={styles.thumbnail}>
        <Image src={thumbnail} width={48} height={48} alt="thumbnail" />
      </div>
      <p className={messageText()}>{text}</p>
    </div>
  )
}

const styles = {
  root: flex({
    direction: 'column',
    rowGap: '8px',
    color: 'font.dark',
  }),
  message: flex({
    columnGap: '24px',
  }),
  thumbnail: css({
    flexShrink: '0',
    '& img': {
      borderRadius: '50%',
    },
  }),
  userText: css({
    alignSelf: 'flex-end',
    bgColor: 'message.user',
  }),
  memberText: css({
    ml: '72px',
  }),
  separator: css({
    mb: '24px',
  }),
}
