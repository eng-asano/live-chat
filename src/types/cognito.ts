export interface UserInfo {
  'custom:team_code': string
  'cognito:username': string
  name: string
  given_name: string
  family_name: string
  'custom:post': string
  'custom:thumbnail_key': string
  'custom:is_active': 0 | 1
}
