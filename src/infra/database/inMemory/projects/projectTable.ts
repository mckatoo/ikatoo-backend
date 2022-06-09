import { randomUUID } from 'crypto'

type CardProps = {
  title: string
  subTitle?: string
  content: string
}

type ProjectProps = {
  id?: string,
  snapshot: string
  description: CardProps
  githubLink?: string
}

type ProjectWithoutId = Omit<ProjectProps, 'id'>

type OptionalProjectProps = Partial<ProjectWithoutId>

const data: ProjectProps[] = [
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
    snapshot: '/images/snap-calm.png',
    description: {
      title: 'Calm Organizador de Criptomoedas',
      subTitle: '2022 - 03',
      content: 'Projeto pessoal para estudo.'
    }
  },
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf81',
    snapshot: '/images/snap-calm.png',
    description: {
      title: 'Calm Organizador de Criptomoedas',
      subTitle: '2022 - 03',
      content: 'Projeto pessoal para estudo.'
    },
    githubLink: 'https://github.com/mckatoo/calm'
  },
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf82',
    snapshot: '/images/snap-calm.png',
    description: {
      title: 'Calm Organizador de Criptomoedas',
      subTitle: '2022 - 03',
      content: 'Projeto pessoal para estudo.'
    }
  },
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf83',
    snapshot: '/images/snap-calm.png',
    description: {
      title: 'Calm Organizador de Criptomoedas',
      subTitle: '2022 - 03',
      content: 'Projeto pessoal para estudo.'
    }
  }
]

export default {
  table: data,
  insert: (newPage: ProjectProps) => {
    const { id } = newPage
    if (data.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) newPage.id = randomUUID()

    data.push(newPage)
  },
  update: (id: string, newData: OptionalProjectProps) => {
    const oldData: ProjectProps | undefined = data.find(
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
