export interface User {
  id: string
  username: string
  email: string
}

export interface LoginCredentials {
  usernameOrEmail: string
  password: string
  rememberMe?: boolean
}

export interface Message {
  id: string
  content: string
  createdAt: string
  user: User
  children: Message[]
}
