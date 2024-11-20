'use client'

import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { useAuthContext } from '@/hooks/useAuthContext'

const formSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

export const SignInForm = () => {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const { login } = useAuthContext()

  const { mutateAsync, isLoading } = useMutation<void, Error, FormData>({
    mutationFn: (data: FormData) => login(data),
    onSuccess: () => {
      toast.success('Sign in successfully')
      window.location.href = '/'
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: FormData) => {
    mutateAsync(data)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          name='usernameOrEmail'
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel htmlFor='usernameOrEmail'>Username or Email</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  id='usernameOrEmail'
                  {...form.register('usernameOrEmail')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  id='password'
                  {...form.register('password')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='rememberMe'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex items-end gap-2'>
              <FormControl>
                <Checkbox
                  id='remember-me'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <Label htmlFor='remember-me'>Remember me</Label>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full mt-2' disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className='text-sm text-center'>
          Don&apos;t have an account?
          <Link href='/auth/sign-up' className='text-blue-500'>
            {' '}
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  )
}
