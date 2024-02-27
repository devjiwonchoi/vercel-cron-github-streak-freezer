export type Friend = {
  id: number
  uuid: string
  favorite?: boolean
  profile_nickname?: string
  profile_thumbnail_image?: string
}

export type FriendsListResponse = {
  elements?: Friend[]
  total_count: number
  before_url?: string
  after_url?: string
  favorite_count?: number
}

export type TemplateTextMessageData = {
  receiver_uuids: string[]
  template_object: {
    object_type: 'text'
    text: string
    link: {
      web_url: string
    }
    button_title?: string
  }
}
