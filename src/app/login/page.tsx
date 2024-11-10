import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Auth } from '@aws-amplify/auth'
import { authConfig } from '@/src/utils/auth'
import { signInWithCredentials, verifyIdToken } from '@/src/actions/auth'
import { UserIdInput, PasswordInput, SocialLogin } from '@/src/components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { neumorphismDump } from '@/styled-system/recipes'

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
    <section className={styles.root}>
      <div className={styles.heading}>
        <Image src="/images/live-chat.png" className={styles.icon} width={40} height={40} alt="Live Chat Icon" />
        <h1 className={styles.title}>Live&thinsp;Chat</h1>
      </div>
      <form className={styles.form} action={signIn}>
        <UserIdInput name="username" />
        <PasswordInput name="password" />
        <button type="submit" className={`${neumorphismDump({ type: 'button' })} ${styles.signIn}`}>
          Sign in
        </button>
      </form>
      <div className={styles.other}>
        <div className={styles.or}>or</div>
        <SocialLogin />
      </div>
    </section>
  )
}

const styles = {
  root: flex({
    direction: 'column',
    justify: 'center',
    rowGap: '40px',
    maxWidth: '480px',
    minWidth: '380px',
    height: '100vh',
    margin: '0 auto',
    padding: '0 24px',
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
    width: '40px',
    height: '40px',
  }),
  title: css({
    fontFamily: 'fira',
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    color: 'primary.main',
  }),
  signIn: css({
    width: '100%',
    height: '50px',
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
  or: flex({
    align: 'center',
    fontWeight: 'bold',
    width: '100%',
    color: 'gray.500',
    _before: {
      content: '""',
      width: '100%',
      height: '1px',
      marginRight: '8px',
      backgroundColor: 'gray.400',
    },
    _after: {
      content: '""',
      width: '100%',
      height: '1px',
      marginLeft: '8px',
      backgroundColor: 'gray.400',
    },
  }),
}
