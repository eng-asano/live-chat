'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import * as Toast from '@radix-ui/react-toast'
import { MdHighlightOff } from 'react-icons/md'
import { useActionStateCompat } from '@strozw/use-action-state-compat'
import { UserIdInput, PasswordInput, TeamCodeSelect } from '@/src/components'
import { signIn } from '@/src/actions/auth'
import { useClient } from '@/src/hooks'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { loginUIBase } from '@/styled-system/recipes'

const duration = 3000

export const SignInForm = () => {
  const [res, formAction, isPending] = useActionStateCompat(signIn, undefined)

  const [teamCode, setTeamCode] = useState('')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const { isClient } = useClient()

  useEffect(() => {
    const f = async () => {
      setError(res?.error)
      await new Promise((r) => setTimeout(r, duration))
      setError(undefined)
    }
    f()
  }, [res])

  const disabled = teamCode === '' || userId === '' || password === '' || isPending || error !== undefined

  return (
    <form className={styles.form} action={formAction}>
      <TeamCodeSelect name="teamcode" value={teamCode} onChange={setTeamCode} />
      <UserIdInput name="userid" value={userId} onChange={setUserId} />
      <PasswordInput name="password" value={password} onChange={setPassword} />
      <button type="submit" className={`${loginUIBase()} ${styles.signIn}`} disabled={disabled}>
        Sign In
      </button>
      {isClient &&
        createPortal(
          <Toast.Provider swipeDirection="right" duration={duration}>
            <Toast.Root open={!!error} className={styles.toast.root} defaultOpen={false}>
              <MdHighlightOff size={28} color="#f22911" />
              <Toast.Description>{error}</Toast.Description>
            </Toast.Root>
            <Toast.Viewport className={styles.toast.viewport} />
          </Toast.Provider>,
          document.body
        )}
    </form>
  )
}

const styles = {
  form: flex({
    direction: 'column',
    rowGap: '32px',
  }),
  signIn: css({
    w: '100%',
    h: '50px',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    borderRadius: '24px',
    color: 'gray.700',
    _hover: {
      color: 'primary.main',
    },
    _focus: {
      color: 'primary.main',
    },
    _disabled: {
      opacity: '0.5',
      cursor: 'auto',
      _hover: {
        color: 'gray.700',
      },
    },
  }),
  toast: {
    viewport: css({
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      minW: '320px',
      zIndex: '10',
    }),
    root: flex({
      align: 'center',
      columnGap: '8px',
      h: '60px',
      p: '8px',
      fontWeight: 'bold',
      bgColor: '#fff',
      borderLeftWidth: '4px',
      borderColor: 'error.main',
      borderRadius: '4px',
      boxShadow: '0px 10px 20px',
      boxShadowColor: 'boxShadow.main',
      '&[data-state="open"]': {
        animation: 'toastIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      '&[data-state="closed"]': {
        animation: 'toastOut 0.5s ease-in',
      },
    }),
  },
}
