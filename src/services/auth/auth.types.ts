export type LoginArgs = {
  password: string
  email: string
  rememberMe: boolean
}

export type ProfileResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
