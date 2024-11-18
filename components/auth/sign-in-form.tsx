'use client'

import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '../ui/form'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type FormData = z.infer<typeof formSchema>

export const SignInForm = () => {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const onSubmit = (data: FormData) => {
    console.log(data)
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

        <div className='flex items-center gap-2'>
          <Checkbox id='remember-me' />
          <Label htmlFor='remember-me'>Remember me</Label>
        </div>

        <div>
          <Button type='submit' className='w-full mt-2'>
            Sign In
          </Button>
        </div>

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
