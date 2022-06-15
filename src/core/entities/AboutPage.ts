import { BaseEntity } from './BaseEntity'

export default class AboutPage extends BaseEntity {
  skills: string[] = []
  title?: string
  description: string = ''
  image?: {
    src: string
    alt: string
  }

  constructor (aboutPage?: AboutPage) {
    super({})

    if (aboutPage) {
      const { id, skills, title, description, image } = aboutPage

      if (id !== undefined) this.id = id
      this.skills = skills
      this.title = title
      this.description = description
      this.image = image
    }
  }
}
