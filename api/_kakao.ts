import { fetcher } from './_utils'
import type {
  Friend,
  FriendsListResponse,
  TemplateTextMessageData,
} from './_types'

async function getTargetFriend() {
  // Sort friends order by favorite, limit by 5 (default 10)
  const friendsList: FriendsListResponse = await fetcher({
    endpoint: '/talk/friends?friend_order=favorite&limit=3',
  })

  const targetNickname = process.env.KAKAO_TARGET_NICKNAME
  if (!targetNickname) {
    throw new Error('Target nickname is not defined')
  }

  // Find target friend by nickname
  const targetFriend = friendsList.elements?.find((friend) =>
    friend.profile_nickname?.includes(targetNickname)
  )

  if (!targetFriend) {
    throw new Error(`Target friend not found`)
  }

  return targetFriend
}

async function sendKakaoMessage(friend: Friend) {
  // Text message template to send
  const body: TemplateTextMessageData = {
    receiver_uuids: [friend.uuid],
    template_object: {
      object_type: 'text',
      text: process.env.KAKAO_MESSAGE_TEXT ?? 'Hello, world!',
      link: {
        web_url:
          process.env.KAKAO_MESSAGE_LINK ?? 'https://github.com/devjiwonchoi',
      },
      button_title: process.env.KAKAO_MESSAGE_BUTTON_TITLE ?? 'Visit My GitHub',
    },
  }
  const response = await fetcher({
    endpoint: '/talk/friends/message/default/send',
    method: 'POST',
    body: JSON.stringify(body),
  })

  if (!response.successful_receiver_uuids.length) {
    throw new Error('Failed to send message')
  }

  return 'Message sent successfully!'
}

export async function kakao() {
  const targetFriend = await getTargetFriend()
  const response = await sendKakaoMessage(targetFriend)

  return response
}
