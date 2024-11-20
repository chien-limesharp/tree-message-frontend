'use client'

import { Button } from '../ui/button'
import { CreateMessageDialog } from './create-message.dialog'
import { useState } from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'

interface MessageHeaderProps {
  total: number
}

export const MessageHeader = ({ total }: MessageHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useAuthContext()

  const onWriteNew = () => {
    if (!user) {
      window.location.href = '/auth/sign-in'
      return
    }

    setIsOpen(true)
  }
  
  return (
    <div className='flex justify-between items-center mb-6'>
      <p>{total} results</p>

      <Button onClick={onWriteNew}>Write New</Button>

      <CreateMessageDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type='message'
      />
    </div>
  )
}
