import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMessage as createMessageApi } from '@/apis/message.api'
import { toast } from 'sonner'

export const useCreateMessage = (callback: () => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync: createMessage, isLoading } = useMutation({
    mutationFn: createMessageApi,
    onSuccess: () => {
      toast.success('Message created successfully')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      callback()
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  return { createMessage, isLoading }
}
