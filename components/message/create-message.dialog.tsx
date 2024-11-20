'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCreateMessage } from '@/hooks/useCreateMessage'

type Props = {
  isOpen: boolean
  onClose: () => void
  type: 'message' | 'comment'
  messageId?: string
}

export const CreateMessageDialog = ({
  isOpen,
  onClose,
  type,
  messageId,
}: Props) => {
  const [message, setMessage] = useState('')
  const maxLength = 200
  const minLength = 3
  const remainingChars = maxLength - message.length

  const { createMessage, isLoading } = useCreateMessage(onClose)

  useMemo(() => {
    if (!isOpen) {
      setMessage('')
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (message.length < minLength || message.length > maxLength) return
    createMessage({ content: message, parentId: messageId })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {type === 'message' ? 'Create New Message' : 'Create New Comment'}
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <Textarea
              placeholder='Type your message here...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='min-h-[100px]'
              disabled={isLoading}
              maxLength={maxLength}
            />
            <p
              className={`text-sm text-right ${
                remainingChars < 0 || message.length < minLength
                  ? 'text-red-500'
                  : 'text-gray-500'
              }`}
            >
              {remainingChars} characters remaining
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              message.length < minLength ||
              message.length > maxLength ||
              isLoading
            }
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
