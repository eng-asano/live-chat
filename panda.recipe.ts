import { defineRecipe } from '@pandacss/dev'

export const loginUIBaseRecipe = defineRecipe({
  className: 'loginBaseUI',
  description: 'Login base UI',
  base: {
    border: '1px solid #c9c9c9',
    outline: 'none',
  },
})

export const separatorRecipe = defineRecipe({
  className: 'separator',
  description: 'separator style',
  base: {
    display: 'flex',
    alignItems: 'center',
    w: '100%',
    fontSize: '0.9rem',
    color: 'gray.500',
    wordBreak: 'normal',
    _before: {
      content: '""',
      w: '100%',
      h: '1px',
      mr: '8px',
      bgColor: 'gray.300',
    },
    _after: {
      content: '""',
      w: '100%',
      h: '1px',
      ml: '8px',
      bgColor: 'gray.300',
    },
  },
})

export const messageTextRecipe = defineRecipe({
  className: 'messageText',
  description: 'message text style',
  base: {
    display: 'flex',
    alignItems: 'center',
    maxW: '590px',
    p: '8px',
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    bgColor: 'message.member',
    borderRadius: '16px',
    whiteSpace: 'pre-wrap',

    sm: {
      p: '16px',
    },
  },
})
