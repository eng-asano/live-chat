declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    AWS_REGION: string
    NEXT_PUBLIC_API_ROUTE_URL: string
    NEXT_PUBLIC_LIVE_CHAT_WEBSOCKET: string
  }
}
