'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useMemo } from 'react'

type AppProviderProps = {
  children: React.ReactNode
  session: Session | null
}

export const AppProvider = ({ children, session }: AppProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <SessionProvider session={session}>
      <Toaster
        richColors
        position='top-right'
        toastOptions={{ duration: 1000 }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
