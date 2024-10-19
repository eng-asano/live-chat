import React from 'react'
import { MdLogin } from 'react-icons/md'
import { flex } from '@/styled-system/patterns'
import { neumorphismDump } from '@/styled-system/recipes'

interface Props {
  children: React.ReactNode
}

export const Card = ({ children }: Props) => {
  return (
    <div className={`${neumorphismDump({ type: 'card' })} ${styles.card}`}>
      {children}
      <button className={`${neumorphismDump({ type: 'button' })} ${styles.enter}`}>
        <MdLogin size={24} />
        Enter
      </button>
    </div>
  )
}

const styles = {
  card: flex({
    direction: 'column',
    justifyContent: 'center',
    align: 'center',
    rowGap: '20px',
    height: '100%',
    padding: '24px',
    borderRadius: '8px',
  }),
  enter: flex({
    justify: 'center',
    align: 'center',
    columnGap: '8px',
    width: '120px',
    padding: '8px',
    marginTop: 'auto',
    fontWeight: 'bold',
    borderRadius: '8px',
    _hover: {
      color: 'primary.main',
    },
    _focus: {
      color: 'primary.main',
    },
  }),
}
