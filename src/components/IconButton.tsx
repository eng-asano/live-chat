'use client'

import { MdChat, MdLogout } from 'react-icons/md'
import { flex } from '@/styled-system/patterns'

interface Props {
  children: React.ReactNode
  icon: 'chat' | 'sign-out'
  isActive?: boolean
}

export const IconButton = ({ children, icon, isActive }: Props) => {
  return (
    <button className={styles.btn(isActive)}>
      {icon === 'chat' && <MdChat size={24} color="#fff" />}
      {icon === 'sign-out' && <MdLogout size={24} color="#fff" />}
      {children}
    </button>
  )
}

const styles = {
  btn: (isActive?: boolean) =>
    flex({
      direction: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '2px',
      w: '84px',
      h: '52px',
      fontSize: '0.85rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      bgColor: isActive ? 'primary.dark' : 'primary.main',
      _hover: {
        bgColor: 'primary.dark',
      },
      _focus: {
        bgColor: 'primary.dark',
        outline: 'none',
      },
    }),
}
