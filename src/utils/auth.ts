export const authConfig = {
  region: process.env.AWS_REGION,
  userPoolId: process.env.COGNITO_POOL_ID,
  userPoolWebClientId: process.env.COGNITO_POOL_CLIENT_ID,
  oauth: {
    domain: process.env.COGNITO_DOMAIN,
    scope: ['openid', 'phone', 'email'],
    redirectSignIn: 'http://localhost:3000/dashboard',
    redirectSignOut: 'http://localhost:3000/sign-in',
    responseType: 'code',
  },
} as const

export const cookieOption = {
  httpOnly: false,
  secure: false,
  sameSite: 'strict',
  maxAge: 60 * 60 * 24,
} as const
