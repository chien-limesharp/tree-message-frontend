export const metadata = {
  title: 'Auth',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen items-center justify-center translate-y-[-100px]'>
      {children}
    </div>
  )
}
