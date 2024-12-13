import { Fira_Code } from 'next/font/google'
import { css } from '@/styled-system/css'
import './globals.css'

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
      <body>
        <div className={styles.root}>{children}</div>
      </body>
    </html>
  )
}

const styles = {
  root: css({
    h: '100dvh',
    bg: 'primary.main',
  }),
}
