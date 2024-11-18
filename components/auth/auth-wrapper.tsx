import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type AuthWrapperProps = {
  title: string
  children: React.ReactNode
}

export const AuthWrapper = ({ title, children }: AuthWrapperProps) => {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}
