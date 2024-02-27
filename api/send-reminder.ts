import { kakao } from './_kakao'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')

  // See https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    // Replace with your own provider
    const response = await kakao()
    return new Response(response, { status: 200 })
  }

  return new Response('Unauthorized', { status: 401 })
}
