'use client'

import { Button } from './ui/button'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { useAuthContext } from '@/hooks/useAuthContext'
import { Loader2 } from 'lucide-react'

export const Header = () => {
  const { user, isLoading, logout } = useAuthContext()

  return (
    <div className='border-b p-5 flex items-center justify-end gap-2'>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : user ? (
        <>
          <div className='flex items-center gap-x-3 border-r pr-5'>
            <div className='text-sm'>
              <p className='font-medium'>{user?.username}</p>
            </div>
          </div>

          <Separator orientation='vertical' />

          <Button
            onClick={() => logout()}
            variant='ghost'
            size='sm'
            className='text-gray-500'
          >
            Log out
          </Button>
        </>
      ) : (
        <Link href='/auth/sign-in'>
          <Button size='sm'>Login</Button>
        </Link>
      )}
    </div>
  )
}
