export interface Session {
  team_code: string
  user_id: string
}

export interface Message {
  team_code: string
  created_at: string
  user_id: string
  content: string
  content_type: string
  connection_id: string
}
