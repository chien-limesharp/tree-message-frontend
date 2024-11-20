'use client'

import { LoginCredentials, User } from '@/lib/type'
import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUserProfile } from '@/apis/auth.api'
import axios from 'axios'
import { toast } from 'sonner'

export const AuthContext = createContext<{
  user: User | null
  logout: () => Promise<void>
  login: (credentials: LoginCredentials) => Promise<void>
  isLoading: boolean
}>({
  user: null,
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  isLoading: false,
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const getCurrentUser = async () => {
    setIsLoading(true)

    try {
      const res = await getCurrentUserProfile()

      const data = res.data

      setUser(data)
      return data
    } catch (err) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/auth/login', credentials, {
        withCredentials: true,
      })

      const data = res.data

      await getCurrentUser()
      return data
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/auth/logout', {
        withCredentials: true,
      })

      const data = res.data

      setUser(null)
      return data
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Logout failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
