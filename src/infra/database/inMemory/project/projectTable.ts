import { randomUUID } from 'crypto'

type ProjectProps = {
  id?: string
  snapshot: string
  githubLink?: string
  title: string
  yearMonthEnd?: string
  description: string
  projectsPageId: string
}

type ProjectWithoutId = Omit<ProjectProps, 'id'>

type OptionalProjectProps = Partial<ProjectWithoutId>

const data: ProjectProps[] = [
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
    snapshot: '/images/snap-calm.png',
    description: 'Projeto pessoal para estudo.',
    title: 'Calm Organizador de Criptomoedas',
    yearMonthEnd: '2022 - 03',
    projectsPageId: '83ee76b5-c877-4eb1-b919-876d177bcf85'
  },
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf81',
    snapshot: '/images/snap-calm.png',
    description: 'Projeto pessoal para estudo1.',
    title: 'Calm Organizador de Criptomoedas1',
    yearMonthEnd: '2022 - 04',
    projectsPageId: '83ee76b5-c877-4eb1-b919-876d177bcf85'
  },
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf82',
    snapshot: '/images/snap-calm.png',
    description: 'Projeto pessoal para estudo2.',
    title: 'Calm Organizador de Criptomoedas2',
    yearMonthEnd: '2022 - 05',
    projectsPageId: '83ee76b5-c877-4eb1-b919-876d177bcf85'
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
