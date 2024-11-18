'use client'

import { useMemo } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export const Header = () => {
  const { data: session, status } = useSession()

  const isLoading = useMemo(() => status === 'loading', [status])

  return (
    <div className='border-b p-5 flex items-center justify-end gap-2'>
      {isLoading ? (
        <p>Loading</p>
      ) : session ? (
        <>
          <div className='flex items-center gap-x-3 border-r pr-5'>
            <div className='text-sm'>
              <p className='font-medium'>{session.user.username}</p>
            </div>
          </div>

          <Separator orientation='vertical' />

          <Button
            onClick={() => signOut()}
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
