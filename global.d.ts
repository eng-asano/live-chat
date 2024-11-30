declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_AWS_REGION: string
    NEXT_PUBLIC_BASE_URL: string
  }
}
