import { AuthWrapper } from '@/components/auth/auth-wrapper'
import { SignUpForm } from '@/components/auth/sign-up-form'

export default function SignUpPage() {
  return (
    <AuthWrapper title='Sign Up'>
      <SignUpForm />
    </AuthWrapper>
  )
}
