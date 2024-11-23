import React from 'react'
import { MdPerson, MdLock } from 'react-icons/md'
import { loginUIBase } from '@/styled-system/recipes'
import { css } from '@/styled-system/css'

interface Props {
  name: string
}

export const UserIdInput = ({ name }: Props) => {
  return (
    <div className={styles.root}>
      <MdPerson className={styles.icon} size={24} />
      <input type="text" name={name} className={`${loginUIBase()} ${styles.input}`} placeholder="id" />
    </div>
  )
}

export const PasswordInput = ({ name }: Props) => {
  return (
    <div className={styles.root}>
      <MdLock className={styles.icon} size={24} />
      <input type="password" name={name} className={`${loginUIBase()} ${styles.input}`} placeholder="password" />
    </div>
  )
}

const styles = {
  root: css({
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '50px',
  }),
  icon: css({
    position: 'absolute',
    left: '16px',
    height: 'inherit',
    color: 'gray.500',
  }),
  input: css({
    width: '100%',
    height: '100%',
    paddingLeft: '48px',
    color: 'gray.600',
    borderRadius: '24px',
  }),
}
