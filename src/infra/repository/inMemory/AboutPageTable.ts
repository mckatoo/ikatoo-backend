import AboutPageAdapter from '@app/adapter/AboutPageAdapter'
import AboutPage from '@app/core/entities/AboutPage'
import IAboutPageRepository from '@app/core/repositories/AboutPage/IAboutPageRepositories'
import { randomUUID } from 'crypto'

export default class AboutPageRepositoryMemory implements IAboutPageRepository {
  aboutPage: AboutPage[] = [
    {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      skills: ['Modelagem de dados', 'Desenvolvimento de aplicações'],
      title: 'Olá. Bem vindo❗',
      description: '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes.Fã de animes, mangas, games, séries de TV e filmes. Uma pessoa de família e pai de uma princesa.</p><p>Interessado em todo o espectro de programação e trabalhar em projetos ambiciosos com pessoas positivas.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
    }
  ]

  async getAboutPage (): Promise<AboutPage> {
    return Promise.resolve(AboutPageAdapter.create(this.aboutPage[0]))
  }

  async createAboutPage ({ ...aboutPage }: AboutPage): Promise<void> {
    const { id } = aboutPage
    if (this.aboutPage.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) aboutPage.id = randomUUID()

    this.aboutPage = [AboutPageAdapter.create(aboutPage)]
  }

  async deleteAboutPage (id: string): Promise<void> {
    if (!this.aboutPage.find((page) => page.id === id)) {
      throw new Error('The id does not exist.')
    }

    this.aboutPage.splice(
      this.aboutPage.findIndex((page) => page.id === id),
      1
    )
  }
}
