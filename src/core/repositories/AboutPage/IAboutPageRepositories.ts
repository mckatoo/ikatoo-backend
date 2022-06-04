type AboutProps = {
  skills: string[]
  title?: string
  describe: string
  image?: {
    src: string
    alt: string
  }
}

export default interface IAboutPageRepository {
  getAboutPage(): Promise<AboutProps>
  createAboutPage({ ...aboutPage }: AboutProps): Promise<void>
  updateAboutPage({ id, ...aboutPage }: { id: string } & Partial<AboutProps>): Promise<void>
  deleteAboutPage(id: string): Promise<void>
}
