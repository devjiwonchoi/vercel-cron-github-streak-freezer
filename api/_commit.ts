import { fetcher } from './_utils'

async function validateUsername(username: string) {
  const response = await fetcher({
    endpoint: `/users/${username}`,
  })

  return response.login === username
}

async function getSha(username: string) {
  const response = await fetcher({
    endpoint: `/repos/${username}/${username}/contents/streak-freezer.md`,
  })

  return response.sha
}

async function createOrUpdateFile(username: string) {
  const response = await fetcher({
    endpoint: `/repos/${username}/${username}/contents/streak-freezer.md`,
    method: 'PUT',
    body: JSON.stringify({
      message: 'Update streak-freezer.md',
      content: Buffer.from(`Commit Streak Freezed! ${new Date()}`).toString(
        'base64'
      ),
      sha: await getSha(username),
    }),
  })

  return response
}

export async function commit(username: string) {
  if (!(await validateUsername(username))) {
    throw new Error(`Invalid username: "${username}".`)
  }

  const response = await createOrUpdateFile(username)
  if (response.content.name) {
    throw new Error('Failed to commit.')
  }

  return 'Successfully committed!'
}
