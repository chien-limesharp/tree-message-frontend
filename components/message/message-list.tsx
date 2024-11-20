'use client'

import { MessageCard } from './message-card'
import { Message } from '@/lib/type'
import { MessageSkeleton } from './message-skeleton'
import { useState } from 'react'
import { CreateMessageDialog } from './create-message.dialog'
import { useAuthContext } from '@/hooks/useAuthContext'

interface MessageListProps {
  isLoading: boolean
  messages: Message[]
}

export const MessageList = ({ isLoading, messages }: MessageListProps) => {
  const [replyMessageId, setReplyMessageId] = useState<string | null>(null)

  const { user } = useAuthContext()

  const onReply = (messageId: string) => {
    if (!user) {
      window.location.href = '/auth/sign-in'
      return
    }

    setReplyMessageId(messageId)
  }

  return (
    <div className='space-y-4'>
      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <MessageSkeleton key={index} />
          ))
        : messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onReply={onReply}
            />
          ))}

      {replyMessageId && (
        <CreateMessageDialog
          isOpen={!!replyMessageId}
          onClose={() => setReplyMessageId(null)}
          type='comment'
          messageId={replyMessageId}
        />
      )}
    </div>
  )
}
