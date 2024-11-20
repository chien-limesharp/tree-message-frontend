import axios from 'axios'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    )

    cookieStore.delete('auth')

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Logout failed' }, { status: 500 })
  }
}
