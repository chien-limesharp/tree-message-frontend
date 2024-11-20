'use client'

import { getMessages } from '@/apis/message.api'
import { Header } from '@/components/header'
import { MessageHeader } from '@/components/message/message-header'
import { MessageList } from '@/components/message/message-list'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(),
  })

  return (
    <div>
      <Header />
      <div className='max-w-5xl mx-auto p-4'>
        <MessageHeader total={data?.data.length || 0} />
        <MessageList isLoading={isLoading} messages={data?.data || []} />
      </div>
    </div>
  )
}
