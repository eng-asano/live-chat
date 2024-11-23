import { MdSend } from 'react-icons/md'
import { css } from '@/styled-system/css'

export const MessageInput = () => {
  return (
    <form className={styles.root}>
      <textarea className={styles.textarea} placeholder="Send a message" />
      <button className={styles.btn}>
        <MdSend className={styles.icon} size={24} />
      </button>
    </form>
  )
}

const styles = {
  root: css({
    position: 'relative',
  }),
  textarea: css({
    resize: 'none',
    w: '100%',
    h: '48px',
    p: '12px',
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    bgColor: 'background.light',
    borderRadius: '12px',
  }),
  btn: css({
    position: 'absolute',
    top: '12px',
    right: '12px',
  }),
  icon: css({
    color: 'primary.main',
  }),
}
