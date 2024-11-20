import { createApiClient } from '@/lib/api-client'
import { Message } from '@/lib/type'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export const apiClient = createApiClient(`${apiUrl}/messages`)

interface CreateMessageDto {
  content: string
  parentId?: string
}

export const createMessage = (data: CreateMessageDto) => {
  if (data.parentId) {
    return apiClient.post<Message>(`/${data.parentId}/comments`, data, {
      withCredentials: true,
    })
  }

  return apiClient.post<Message>('/', data, { withCredentials: true })
}

export const getMessages = () => {
  return apiClient.get<Message[]>('/')
}
