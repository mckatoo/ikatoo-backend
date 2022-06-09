import { randomUUID } from 'crypto'
import { ImageProps } from '../image/imageTable'

type AboutPageProps = {
  id?: string
  skills: string[]
  title?: string
  describe: string
  image?: ImageProps
}

type AboutPageWithoutId = Omit<AboutPageProps, 'id'>

type OptionalAboutPageProps = Partial<AboutPageWithoutId>

const data: AboutPageProps[] = [
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
    skills: [
      'javascript',
      'dotnet',
      'nodedotjs',
      'html5',
      'css3',
      'typescript',
      'jest',
      'json',
      'git',
      'bootstrap',
      'react',
      'mysql',
      'npm',
      'php',
      'java'
    ],
    title: 'Olá. Bem vindo❗',
    describe:
      '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes.Fã de animes, mangas, games, séries de TV e filmes. Uma pessoa de família e pai de uma princesa.</p><p>Interessado em todo o espectro de programação e trabalhar em projetos ambiciosos com pessoas positivas.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
  }
]

export default {
  table: data,
  insert: (newPage: AboutPageProps) => {
    const { id } = newPage
    if (data.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) newPage.id = randomUUID()

    data.push(newPage)
  },
  update: (id: string, newData: OptionalAboutPageProps) => {
    const oldData: AboutPageProps | undefined = data.find(
      (page) => page.id === id
    )
    if (!oldData) throw new Error('The id does not exist.')

    const index = data.indexOf(oldData)
    data[index] = {
      ...oldData,
      ...newData
    }
  },
  delete: (id: string) => {
    if (!data.find((page) => page.id === id)) {
      throw new Error('The id does not exist.')
    }

    data.splice(
      data.findIndex((page) => page.id === id),
      1
    )
  }
}
