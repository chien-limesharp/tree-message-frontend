import { Card, CardFooter, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const MessageSkeleton = () => {
  return (
    <Card className='shadow-sm'>
      <CardHeader className='p-4'>
        <Skeleton className='h-6 w-32' />
      </CardHeader>
      <CardContent className='pb-3 px-4'>
        <Skeleton className='h-4 w-full' />
      </CardContent>
      <CardFooter className='px-4 pb-4 flex justify-between items-center'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-8 w-16' />
      </CardFooter>
    </Card>
  )
}
