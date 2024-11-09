'use client'

import React from 'react'
import Image from 'next/image'
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import { authConfig } from '@/app/_utils/auth'
import { neumorphismDump } from '@/styled-system/recipes'
import { flex } from '@/styled-system/patterns'

Auth.configure(authConfig)

export const SocialLogin = React.memo(() => {
  const signInWithGoogle = async () => {
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })
      const session = await Auth.currentSession()

      const idToken = session.getIdToken().getJwtToken()
      const accessToken = session.getAccessToken().getJwtToken()

      fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ idToken, accessToken }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form action={signInWithGoogle}>
      <button type="submit" className={`${neumorphismDump({ type: 'button' })} ${styles.google}`}>
        <Image src="/images/google-icon.png" width={24} height={24} alt="Sign in with Google" />
      </button>
    </form>
  )
})

SocialLogin.displayName = 'SocialLogin'

const styles = {
  google: flex({
    justify: 'center',
    align: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
  }),
}
