import AboutPage from '@app/core/entities/AboutPage'

export default class AboutPageAdapter {
  static create (aboutPage: AboutPage): AboutPage {
    const { id, title, description, skills, image } = aboutPage
    return new AboutPage({
      id,
      title,
      description,
      skills,
      image
    })
  }
}
