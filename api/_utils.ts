export const KAKAO_API_URL = 'https://kapi.kakao.com/v1/api'

export async function fetcher({
  endpoint,
  method = 'GET',
  body,
}: {
  endpoint: string
  method?: string
  body?: string
}) {
  const url = `${KAKAO_API_URL}${endpoint}`
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.KAKAO_API_TOKEN}`,
      },
      method,
      body,
    })

    return await response.json()
  } catch (error) {
    throw error
  }
}
