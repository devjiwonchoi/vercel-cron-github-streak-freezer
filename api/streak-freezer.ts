import VercelCronLogger from 'vercel-cron-logger'
import { checkToday } from './_check-today'
import { commit } from './_commit'

const username = process.env.GITHUB_USERNAME

export async function GET(request: Request) {
  if (!username) {
    return new Response('GITHUB_USERNAME is not set.', { status: 403 })
  }

  // See https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    await VercelCronLogger(request)
    const hasActivityToday = await checkToday(username)

    if (hasActivityToday) {
      return new Response('Activity found for today.', { status: 200 })
    }

    const response = await commit(username)
    return new Response(response, { status: 201 })
  }

  return new Response('Unauthorized.', { status: 401 })
}
