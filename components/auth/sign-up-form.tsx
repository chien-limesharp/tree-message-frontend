'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from '../ui/form'
import { signUp } from '@/apis/auth.api'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

const formSchema = z.object({
  username: z
    .string()
    .min(5, 'Username must be between 5 and 20 characters')
    .max(20, 'Username must be between 5 and 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers')
    .min(1, 'Username is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be between 8 and 20 characters')
    .max(20, 'Password must be between 8 and 20 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .min(1, 'Password is required'),
})

type FormData = z.infer<typeof formSchema>

export const SignUpForm = () => {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('Sign up successfully')
      window.location.href = '/auth/sign-in'
    },
    onError: (error) => {
      toast.error((error as Error).message)
    },
  })

  const onSubmit = async (data: FormData) => {
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
          name='email'
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormControl>
                <Input type='email' id='email' {...form.register('email')} />
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

        <Button type='submit' className='w-full mt-2' disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>

        <p className='text-sm text-center'>
          Already have an account?
          <Link href='/auth/sign-in' className='text-blue-500'>
            {' '}
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  )
}
