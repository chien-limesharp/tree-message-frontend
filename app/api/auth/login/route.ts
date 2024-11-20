import axios from 'axios'

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      body,
      {
        withCredentials: true,
      },
    )

    const data = response.data

    const setCookieHeader = response?.headers?.['set-cookie']

    if (setCookieHeader) {
      const name = setCookieHeader[0].split('=')[0]
      const token = setCookieHeader[0].split('=').slice(1).join('=')

      return new Response(JSON.stringify(data), {
        headers: {
          'Set-Cookie': `${name}=${token}`,
          'Content-Type': 'application/json',
        },
      })
    }

    return Response.json(data)
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
