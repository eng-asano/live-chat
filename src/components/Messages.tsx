import Image from 'next/image'
import React from 'react'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { separator, messageText } from '@/styled-system/recipes'

export const Messages = () => {
  return (
    <div className={styles.root}>
      <div className={`${separator()} ${styles.separator}`}>Today</div>
      <ImageMessage text="Nice to meet you, my name is Olivia." thumbnail="/images/woman.png" />
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.userText}`}>
        Nice to meet you! I&apos;m David, a senior developer. If you have any questions, feel free to ask me anything.
        I&apos;m looking forward to hearing from you!
      </p>
      <ImageMessage text="Nice to meet you, my name is Olivia." thumbnail="/images/woman.png" />
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.userText}`}>
        Nice to meet you! I&apos;m David, a senior developer. If you have any questions, feel free to ask me anything.
        I&apos;m looking forward to hearing from you!
      </p>
      <ImageMessage text="Nice to meet you, my name is Olivia." thumbnail="/images/woman.png" />
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.memberText}`}>
        Starting today, I will be working at Tech Co., Ltd. I apologize for any inconvenience I may cause as a newbie,
        but I appreciate your help.
      </p>
      <p className={`${messageText()} ${styles.userText}`}>
        Nice to meet you! I&apos;m David, a senior developer. If you have any questions, feel free to ask me anything.
        I&apos;m looking forward to hearing from you!
      </p>
    </div>
  )
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
