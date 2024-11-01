import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Readonly<Props>) {
  const cookieStore = cookies()
  const idToken = cookieStore.get('idToken')?.value
  const accessToken = cookieStore.get('accessToken')?.value

  if (!idToken || !accessToken) redirect('/login')

  return children
}
