import React, { useCallback } from 'react'
import { MdPerson, MdLock } from 'react-icons/md'
import { neumorphismDent } from '@/styled-system/recipes'
import { css } from '@/styled-system/css'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const UserIdInput = React.memo(({ value, onChange }: Props) => {
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
        value={value}
        className={`${neumorphismDent({ type: 'input' })} ${styles.input}`}
        placeholder="User ID"
        onChange={change}
      />
    </div>
  )
})

UserIdInput.displayName = 'UserIdInput'

export const PasswordInput = React.memo(({ value, onChange }: Props) => {
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
        value={value}
        className={`${neumorphismDent({ type: 'input' })} ${styles.input}`}
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
