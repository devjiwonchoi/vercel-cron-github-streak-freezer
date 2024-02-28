import { fetcher } from './_utils'

export async function checkToday(username: string) {
  const userEvents: Record<string, string | number | boolean>[] = await fetcher(
    {
      endpoint: `/users/${username}/events`,
    }
  )

  const today = new Date().toISOString().split('T')[0]
  const hasActivity: boolean = userEvents.some(
    (event) => event.public && (event.created_at as string).includes(today)
  )

  return hasActivity
}
