'use client'

import { css } from '@/styled-system/css'

interface Props {
  isActive: boolean
}

export const ActivePoint = ({ isActive }: Props) => {
  return <div className={styles.root(isActive)}></div>
}

const styles = {
  root: (isActive: boolean) =>
    css({
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: isActive ? 'accent.main' : 'background.light',
    }),
}
