import { BaseEntity } from './BaseEntity'

export default class ContactPage extends BaseEntity {
  title: string
  description: string
  localization?: string

  constructor ({ id, title, description, localization }: ContactPage) {
    super({})
    if (id !== undefined) this.id = id
    this.title = title
    this.description = description
    if (this.localization !== undefined) this.localization = localization
  }
}
