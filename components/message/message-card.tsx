import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
} from '../ui/card'
import { Message } from '@/lib/type'
import dayjs from 'dayjs'

interface MessageCardProps {
  message: Message
  onReply: (messageId: string) => void
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onReply,
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const handleReply = (messageId: string) => {
    onReply(messageId)
  }

  return (
    <Card className='shadow-sm'>
      <CardContent className='pt-6'>
        {message.content}

        {isCommentsOpen && (
          <div className='space-y-4 mt-4'>
            {message.children.map((child) => (
              <MessageCard
                key={child.id}
                message={child}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className='px-4 pb-4 flex items-center gap-4'>
        <p className='text-sm'>{message.user?.username ?? ''}</p>
        <p className='text-sm text-gray-500'>
          {dayjs(message.createdAt).format('DD/MM/YYYY HH:mm')}
        </p>
        <div>|</div>
        <p className='text-sm text-gray-500'>
          {message.children?.length ?? 0} comments
        </p>
        {message.children?.length ? (
          <Button
            variant='link'
            size='sm'
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            {isCommentsOpen ? 'Hide All' : 'View All'}
          </Button>
        ) : null}
        <div className='flex-grow'></div>
        <Button size='sm' onClick={() => handleReply(message.id)}>
          Reply
        </Button>
      </CardFooter>
    </Card>
  )
}
