import axios, { AxiosError, isAxiosError } from 'axios'

interface ErrorResponse {
  message?: string
}

export const createApiClient = (rootUrl: string) => {
  const apiClient = axios.create({
    baseURL: rootUrl, // Set the dynamic base URL
    headers: {
      'Content-Type': 'application/json',
    },
  })

  apiClient.interceptors.request.use(
    (config) => {
      // Retrieve the token from where you have stored it (memory, context, or cookie)
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponse>) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'An unknown error occurred'
        return Promise.reject(new Error(errorMessage))
      }
      return Promise.reject(new Error('An unexpected error occurred'))
    },
  )

  return apiClient
}
