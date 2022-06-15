import AboutPage from '@app/core/entities/AboutPage'

export type UpdateAboutPageProps = { id: string } & Partial<AboutPage>

export default interface IAboutPageRepository {
  getAboutPage(): Promise<AboutPage | undefined>
  createAboutPage(aboutPage: AboutPage): Promise<void>
  deleteAboutPage(): Promise<void>
}
