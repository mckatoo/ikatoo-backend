import AboutPageRepository from '@app/infra/repository/inMemory/AboutPageMemory'
import { randomUUID } from 'crypto'

describe('Test About Data InMemory Database', () => {
  let aboutPageRepository: AboutPageRepository

  beforeEach(() => {
    aboutPageRepository = new AboutPageRepository()
  })

  it('Should show default data on about_page table', async () => {
    const aboutPage = await aboutPageRepository.getAboutPage()

    expect(aboutPage).toEqual({
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      skills: ['Modelagem de dados', 'Desenvolvimento de aplicações'],
      title: 'Olá. Bem vindo❗',
      description: '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes.Fã de animes, mangas, games, séries de TV e filmes. Uma pessoa de família e pai de uma princesa.</p><p>Interessado em todo o espectro de programação e trabalhar em projetos ambiciosos com pessoas positivas.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
    })
  })

  it('Should insert new data on about_page table', async () => {
    const newData = {
      title: 'Title test',
      description: 'Describe test',
      skills: ['Test', 'Test2']
    }

    await aboutPageRepository.createAboutPage(newData)
    const aboutPage = await aboutPageRepository.getAboutPage()

    expect(aboutPage).toHaveProperty('title', 'Title test')
    expect(aboutPage).toHaveProperty('description', 'Describe test')
    expect(aboutPage).toHaveProperty('skills', ['Test', 'Test2'])
  })

  it('Should insert new data with id on about_page table', async () => {
    const newData = {
      id: randomUUID(),
      title: 'Title test',
      description: 'Describe test',
      skills: ['Test', 'Test2']
    }

    await aboutPageRepository.createAboutPage(newData)
    const aboutPage = await aboutPageRepository.getAboutPage()

    expect(aboutPage).toHaveProperty('id', newData.id)
  })

  it('Should return an error when informing an existing id', async () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      title: 'Title test',
      description: 'Describe test',
      skills: ['Test', 'Test3']
    }

    await expect(aboutPageRepository.createAboutPage(newData))
      .rejects
      .toThrowError('The id already exists.')
  })

  it('Should delete a existent page', async () => {
    aboutPageRepository.deleteAboutPage()
    const aboutPage = await aboutPageRepository.getAboutPage()

    expect(aboutPage).toBeUndefined()
  })

  it('Should update the about page', async () => {
    await aboutPageRepository.createAboutPage({
      title: 'Title test updated',
      description: 'Describe test updated',
      skills: ['Test', 'Test4']
    })

    const aboutPageUpdated = await aboutPageRepository.getAboutPage()

    expect(aboutPageUpdated).toHaveProperty('title', 'Title test updated')
    expect(aboutPageUpdated).toHaveProperty('description', 'Describe test updated')
  })
})
