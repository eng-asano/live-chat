import Image from 'next/image'
import { redirect } from 'next/navigation'
import { signInWithCredentials } from '@/app/_actions/auth'
import { UserIdInput, PasswordInput } from '@/app/_components'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { neumorphismDump } from '@/styled-system/recipes'

export default function Login() {
  const signIn = async (formData: FormData) => {
    'use server'
    const { redirectUrl } = await signInWithCredentials(formData)
    if (redirectUrl) redirect(redirectUrl)
  }

  return (
    <section className={styles.root}>
      <div className={styles.heading}>
        <Image src="/live-chat.png" className={styles.icon} width={40} height={40} alt="Live Chat Icon" />
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
        <div className={`${neumorphismDump({ type: 'button' })} ${styles.google}`}>
          <Image src="/google-icon.png" width={24} height={24} alt="Sign in with Google" />
        </div>
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
  google: flex({
    justify: 'center',
    align: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  }),
}
