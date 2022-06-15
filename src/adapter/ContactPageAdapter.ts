import ContactPage from '@app/core/entities/ContactPage'

export default class ContactPageAdapter {
  static create (contactPage: ContactPage): ContactPage {
    const { id, title, description, localization } = contactPage

    return new ContactPage({
      id,
      title,
      description,
      localization
    })
  }
}
