import { redirect } from 'next/navigation'
import { Auth } from '@aws-amplify/auth'
import { authConfig } from '@/src/utils/auth'
import { signInWithCredentials, verifyIdToken } from '@/src/actions/auth'
import { UserIdInput, PasswordInput, SocialLogin } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { loginUIBase, separator } from '@/styled-system/recipes'

Auth.configure(authConfig)

export default async function Login() {
  const res = await verifyIdToken()
  if (res.status === 'success') redirect('/rooms')

  const signIn = async (formData: FormData) => {
    'use server'
    const { redirectUrl } = await signInWithCredentials(formData)
    if (redirectUrl) redirect(redirectUrl)
  }

  return (
    <div className={styles.root}>
      <section className={styles.login}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Live&thinsp;Chat</h1>
        </div>
        <form className={styles.form} action={signIn}>
          <UserIdInput name="username" />
          <PasswordInput name="password" />
          <button type="submit" className={`${loginUIBase()} ${styles.signIn}`}>
            Sign In
          </button>
        </form>
        <div className={styles.other}>
          <div className={`${separator()} ${styles.or}`}>or</div>
          <SocialLogin />
        </div>
      </section>
    </div>
  )
}

const styles = {
  root: flex({
    justify: 'center',
    align: 'center',
    h: '100%',
    bg: 'background.main',
  }),
  login: flex({
    direction: 'column',
    justify: 'center',
    rowGap: '40px',
    w: '480px',
    m: 'auto',
    p: '32px',
    bg: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
  }),
  heading: flex({
    justify: 'center',
    align: 'center',
    columnGap: '20px',
  }),
  form: flex({
    direction: 'column',
    rowGap: '40px',
  }),
  icon: css({
    w: '40px',
    h: '40px',
  }),
  title: css({
    fontFamily: 'fira',
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    color: 'primary.main',
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
      opacity: 0.5,
      cursor: 'auto',
      _hover: {
        color: 'gray.700',
      },
    },
  }),
  other: flex({
    direction: 'column',
    align: 'center',
    rowGap: '16px',
  }),
  or: css({
    fontSize: '1.1rem',
  }),
}
