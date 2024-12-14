'use client'

import { memo, useCallback } from 'react'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'
import moment from 'moment'
import { useLiveChat, useThumbnail } from '@/src/hooks'
import { formatISO8601 } from '@/src/utils/data'
import { Message } from '@/src/types'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { separator, messageText } from '@/styled-system/recipes'

interface MessagesProps {
  teamCode: string
  userId: string
}

export const Messages = memo(({ teamCode, userId }: MessagesProps) => {
  const { messages, hasMoreMessage, loadPrevMessages } = useLiveChat(teamCode, userId)

  const { thumbnails } = useThumbnail(teamCode)

  const nextMessages = useCallback(() => {
    loadPrevMessages?.()
  }, [loadPrevMessages])

  if (!thumbnails) return <></>

  return (
    <div id="message-scroll" className={styles.root}>
      <InfiniteScroll
        dataLength={messages.length}
        next={nextMessages}
        hasMore={hasMoreMessage}
        inverse={true}
        loader={undefined}
        scrollableTarget="message-scroll"
        className={styles.scroll}
      >
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <Content
              key={m.created_at}
              userId={userId}
              content={m.content}
              createdAt={m.created_at}
              memberId={m.user_id}
              prevContent={messages?.[i - 1]}
              thumbnails={thumbnails}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
})

Messages.displayName = 'Messages'

interface ContentProps {
  userId: string
  content: string
  createdAt: string
  memberId: string
  prevContent?: Message
  thumbnails: { [key: string]: string }
}

const Content = ({ content, memberId, createdAt, prevContent, userId, thumbnails }: ContentProps) => {
  const date = formatISO8601(createdAt)
  const prevData = prevContent?.created_at && formatISO8601(prevContent.created_at)

  return (
    <>
      {date !== prevData && (
        <div className={`${separator()} ${styles.date}`}>
          <span>{date}</span>
        </div>
      )}
      {memberId === userId ? (
        <UserMessage text={content} createdAt={createdAt} />
      ) : memberId === prevContent?.user_id ? (
        // 同じユーザーからの連続投稿の場合はメッセージのみ表示
        <MemberMessage text={content} createdAt={createdAt} />
      ) : (
        <ImageMessage text={content} createdAt={createdAt} thumbnail={thumbnails[memberId]} />
      )}
    </>
  )
}

interface MessageProps {
  text: string
  createdAt: string
}

const UserMessage = ({ text, createdAt }: MessageProps) => {
  const time = moment(createdAt).format('HH:mm')

  return (
    <p className={`${styles.userArea}`}>
      <time className={styles.time} datatype={createdAt}>
        {time}
      </time>
      <span className={`${messageText()} ${styles.userText}`}>{text}</span>
    </p>
  )
}

const MemberMessage = ({ text, createdAt }: MessageProps) => {
  const time = moment(createdAt).format('HH:mm')

  return (
    <p className={`${styles.memberArea}`}>
      <span className={`${messageText()} ${styles.memberText}`}>{text}</span>
      <time className={styles.time} datatype={createdAt}>
        {time}
      </time>
    </p>
  )
}

const ImageMessage = ({ text, createdAt, thumbnail }: { text: string; createdAt: string; thumbnail: string }) => {
  const time = moment(createdAt).format('HH:mm')

  return (
    <div className={styles.imgMessage}>
      <div className={styles.thumbnail}>
        <Image src={thumbnail} width={48} height={48} alt="thumbnail" />
      </div>
      <p className={styles.memberArea}>
        <span className={messageText()}>{text}</span>
        <time className={styles.time} datatype={createdAt}>
          {time}
        </time>
      </p>
    </div>
  )
}

const styles = {
  root: flex({
    w: '100%',
    h: 'calc(100dvh - 104px)',
    p: '32px',
    flexDirection: 'column-reverse',
    overflowY: 'auto',

    sm: {
      h: 'calc(100dvh - 90px)',
    },
  }),
  scroll: flex({
    flexDirection: 'column-reverse',
    position: 'relative',
    w: '100%',
    maxW: '1280px',
    m: '0 auto',
  }),
  messages: flex({
    direction: 'column',
    rowGap: '16px',
    color: 'font.dark',
  }),
  imgMessage: flex({
    columnGap: '24px',
  }),
  thumbnail: css({
    flexShrink: '0',
    '& img': {
      borderRadius: '50%',
    },
  }),
  userArea: flex({
    alignSelf: 'flex-end',
    columnGap: '4px',
    pl: '32px',
  }),
  userText: css({
    bgColor: 'message.user',
  }),
  memberArea: flex({}),
  memberText: css({
    ml: '72px',
  }),
  date: css({
    mb: '24px',
    '& span': {
      flexShrink: '0',
    },
  }),
  time: css({
    flexShrink: '0',
    alignSelf: 'flex-end',
    pb: '2px',
    fontSize: '0.9rem',
    color: 'gray.500',
  }),
}
