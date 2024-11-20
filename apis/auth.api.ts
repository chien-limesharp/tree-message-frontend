import { createApiClient } from '@/lib/api-client'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export const apiClient = createApiClient(`${apiUrl}/auth`)

interface SignUpDto {
  username: string
  email: string
  password: string
}

export const signUp = async (data: SignUpDto) => {
  return apiClient.post('/register', data)
}

export const getCurrentUserProfile = async () => {
  return apiClient.get('/me', { withCredentials: true })
}
