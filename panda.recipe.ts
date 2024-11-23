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
    maxW: '590px',
    p: '20px 28px',
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    bgColor: 'message.member',
    borderRadius: '48px',
  },
})

// export const neumorphismDentRecipe = defineRecipe({
//   className: 'neumorphism.dent',
//   description: 'The neumorphism styles',
//   base: {
//     border: '1px solid #c9c9c9',
//     outline: 'none',
//   },
//   variants: {
//     type: {
//       input: {
//         // boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #fff',
//       },
//       avatar: {
//         boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #fff',
//       },
//     },
//   },
// })

// export const neumorphismDumpRecipe = defineRecipe({
//   className: 'neumorphism.dump',
//   description: 'The neumorphism styles',
//   base: {
//     border: '1px solid #e9e9e9',
//     outline: 'none',
//   },
//   variants: {
//     type: {
//       button: {
//         cursor: 'pointer',
//         // boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #fff',
//         _active: {
//           // boxShadow: 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #fff',
//           _disabled: {
//             // boxShadow: '3px 3px 6px #babecc, -3px -3px 6px #fff',
//           },
//         },
//       },
//     },
//   },
// })
