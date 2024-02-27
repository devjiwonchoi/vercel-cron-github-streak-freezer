import { kakao } from './_kakao'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    const response = await kakao()
    return new Response(response, { status: 200 })
  }

  return new Response('Unauthorized', { status: 401 })
}
