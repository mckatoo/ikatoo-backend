import ContactPage from '../entities/ContactPage'

export default interface IContactPageRepositories {
  getContactPage(): Promise<ContactPage>
  createContactPage({ ...contactPage }: ContactPage): Promise<void>
  deleteContactPage(): Promise<void>
}
