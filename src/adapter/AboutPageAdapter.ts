import AboutPage from '@app/core/entities/AboutPage'

export default class AboutPageAdapter {
  static create (aboutPage: AboutPage | undefined): AboutPage {
    if (!aboutPage) return new AboutPage()
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
