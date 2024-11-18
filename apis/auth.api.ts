import { createApiClient } from '@/lib/api-client'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export const apiClient = createApiClient(`${apiUrl}/auth`)

type SignUpData = {
  username: string
  email: string
  password: string
}

export const signUp = (data: SignUpData) => {
  return apiClient.post('/register', data)
}
