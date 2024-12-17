import React from 'react'
import * as Select from '@radix-ui/react-select'
import { MdGroup, MdExpandMore } from 'react-icons/md'
import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { loginUIBase } from '@/styled-system/recipes'

interface Props {
  name: string
  value: string
  onChange: (v: string) => void
}

export const TeamCodeSelect = React.memo(({ name, value, onChange }: Props) => {
  return (
    <Select.Root name={name} value={value} onValueChange={onChange}>
      <Select.Trigger className={`${loginUIBase()} ${styles.trigger}`}>
        <Select.Icon className={styles.icon}>
          <MdGroup size={24} />
        </Select.Icon>
        <Select.Value placeholder={<span className={styles.value}>Select Team Code</span>} />
        <Select.Icon className={styles.expand}>
          <MdExpandMore size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" align="end" sideOffset={4}>
          <Select.Viewport className={styles.viewport}>
            <Select.Item value="jp-tech" className={styles.item}>
              <Select.ItemText>JP-TechCompany</Select.ItemText>
            </Select.Item>
            <Select.Item value="us-tech" className={styles.item}>
              <Select.ItemText>US-TechCompany</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
})

TeamCodeSelect.displayName = 'TeamCodeSelect'

const styles = {
  trigger: flex({
    align: 'center',
    w: '100%',
    h: '50px',
    bg: 'white',
    borderRadius: '24px',
  }),
  icon: css({
    pl: '14px',
    pr: '10px',
  }),
  expand: css({
    ml: 'auto',
    pr: '14px',
  }),
  viewport: flex({
    direction: 'column',
    w: 'calc(var(--radix-select-trigger-width) - 40px)',
    bgColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px',
    boxShadowColor: 'boxShadow.light',
  }),
  item: flex({
    align: 'center',
    h: '48px',
    p: '0 12px',
    cursor: 'pointer',
    outline: 'none',
    _hover: {
      bgColor: 'rgba(227, 227, 227, 0.2)',
      '&[data-state="checked"]': {
        bgColor: 'selected.main',
      },
    },
    '&:not(last-child)': {
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBlockColor: 'gray.300',
    },
    '&[data-state="checked"]': {
      bgColor: 'selected.main',
    },
  }),
  value: css({
    color: 'gray.400',
  }),
}
