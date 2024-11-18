import { AuthWrapper } from '@/components/auth/auth-wrapper'
import { SignInForm } from '@/components/auth/sign-in-form'

export default function SignInPage() {
  return (
    <AuthWrapper title='Sign In'>
      <SignInForm />
    </AuthWrapper>
  )
}
