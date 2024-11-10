export const authConfig = {
  region: 'ap-northeast-1',
  userPoolId: 'ap-northeast-1_RwRVqF57N',
  userPoolWebClientId: 'bcd6meqbl1216p29ialgo21ej',
  oauth: {
    domain: 'live-chat.auth.ap-northeast-1.amazoncognito.com',
    scope: ['openid', 'phone', 'email'],
    redirectSignIn: 'http://localhost:3000/rooms',
    redirectSignOut: 'http://localhost:3000/login',
    responseType: 'code',
  },
} as const

export const cookieOption = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  maxAge: 60 * 60 * 24,
} as const
