'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useMemo } from 'react'
import { AuthProvider } from '@/hooks/useAuthContext'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <AuthProvider>
      <Toaster
        richColors
        position='top-right'
        toastOptions={{ duration: 1000 }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  )
}
