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
// import { signIn } from '@/apis/auth.api'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

export const SignInForm = () => {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data: FormData) =>
      signIn('credentials', {
        username: data.username,
        password: data.password,
        rememberMe: data.rememberMe,
      }),
    onSuccess: () => {
      toast.success('Sign in successfully')
      window.location.href = '/'
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  const onSubmit = (data: FormData) => {
    mutateAsync(data)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          name='username'
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  id='username'
                  {...form.register('username')}
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
