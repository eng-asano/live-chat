import React from 'react'
import { flex } from '@/styled-system/patterns'
import { neumorphismDent } from '@/styled-system/recipes'

interface Props {
  children: React.ReactNode
}

export const Avatar = React.memo(({ children }: Props) => {
  return <div className={`${neumorphismDent({ type: 'avatar' })} ${styles.root}`}>{children}</div>
})

Avatar.displayName = 'Avatar'

const styles = {
  root: flex({
    justify: 'center',
    align: 'center',
    width: '48px',
    height: '48px',
    paddingLeft: '2px',
    color: 'gray.400',
    borderRadius: '50%',
  }),
}
