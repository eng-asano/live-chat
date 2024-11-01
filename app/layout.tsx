import { Auth } from '@aws-amplify/auth'
import { Fira_Code } from 'next/font/google'
import './globals.css'

Auth.configure({
  Auth: {
    region: process.env.COGNITO_REGION_ID,
    userPoolId: process.env.COGNITO_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_POOL_CLIENT_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
})

const FiraCode = Fira_Code({
  weight: ['500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fira-code',
})

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={FiraCode.variable}>
      <body>{children}</body>
    </html>
  )
}
