import { signOut } from '@/src/actions/auth'
import { IconButton } from '@/src/components'
import { flex } from '@/styled-system/patterns'

export const Navigation = () => {
  return (
    <nav className={styles.root}>
      <IconButton icon="chat">Chat</IconButton>
      <form className={styles.form} action={signOut}>
        <IconButton icon="sign-out">Sign Out</IconButton>
      </form>
    </nav>
  )
}

const styles = {
  root: flex({
    justifyContent: 'space-around',
    mt: 'auto',
    p: '12px 0',
    borderTop: '1px solid #ececec',
  }),
  form: flex({
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto 0',
  }),
}
