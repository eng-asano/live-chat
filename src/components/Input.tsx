import React, { useCallback } from 'react'
import { MdGroup, MdPerson, MdLock } from 'react-icons/md'
import { loginUIBase } from '@/styled-system/recipes'
import { css } from '@/styled-system/css'

interface Props {
  name: string
  value: string
  onChange: (v: string) => void
}

export const TeamCodeInput = React.memo(({ name, value, onChange }: Props) => {
  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className={styles.root}>
      <MdGroup className={styles.icon} size={24} />
      <input
        type="text"
        name={name}
        value={value}
        className={`${loginUIBase()} ${styles.input}`}
        placeholder="Team Code"
        onChange={change}
      />
    </div>
  )
})

TeamCodeInput.displayName = 'TeamCodeInput'

export const UserIdInput = React.memo(({ name, value, onChange }: Props) => {
  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className={styles.root}>
      <MdPerson className={styles.icon} size={24} />
      <input
        type="text"
        name={name}
        value={value}
        className={`${loginUIBase()} ${styles.input}`}
        placeholder="ID"
        onChange={change}
      />
    </div>
  )
})

UserIdInput.displayName = 'UserIdInput'

export const PasswordInput = React.memo(({ name, value, onChange }: Props) => {
  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className={styles.root}>
      <MdLock className={styles.icon} size={24} />
      <input
        type="password"
        name={name}
        value={value}
        className={`${loginUIBase()} ${styles.input}`}
        placeholder="Password"
        onChange={change}
      />
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

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
