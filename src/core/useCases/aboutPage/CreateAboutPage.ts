import AboutPage from '@app/core/entities/AboutPage'

export default class CreateAboutPage {
  title: string | undefined
  description: string
  skills: string[]
  image:
    | {
        src: string;
        alt: string;
      }
    | undefined

  constructor ({ title, description, skills, image }: AboutPage) {
    this.title = title
    this.description = description
    this.skills = skills
    this.image = image
  }

  execute () {
    const aboutPage = new AboutPage({
      title: 'About Page',
      description: 'About Page Description',
      skills: ['skill1', 'skill2', 'skill3'],
      image: {
        src: 'image.src',
        alt: 'Image Description'
      }
    })

    return aboutPage
  }
}
