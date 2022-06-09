import { randomUUID } from 'crypto'

type SkillsPageProps = {
  id?: string,
  title: string
  rankPercent: number
}

type SkillsPageWithoutId = Omit<SkillsPageProps, 'id'>

type OptionalSkillsPageProps = Partial<SkillsPageWithoutId>

const data: SkillsPageProps[] = [
  { id: '83ee76b5-c877-4eb1-b919-876d177bcf80', title: 'Back-end', rankPercent: 20 },
  { id: '83ee76b5-c877-4eb1-b919-876d177bcf81', title: 'Modelagem de dados', rankPercent: 30 },
  { id: '83ee76b5-c877-4eb1-b919-876d177bcf82', title: 'Front-end', rankPercent: 70 },
  { id: '83ee76b5-c877-4eb1-b919-876d177bcf83', title: 'Trabalho em equipe', rankPercent: 85 }
]

export default {
  table: data,
  insert: (newPage: SkillsPageProps) => {
    const { id } = newPage
    if (data.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) newPage.id = randomUUID()

    data.push(newPage)
  },
  update: (id: string, newData: OptionalSkillsPageProps) => {
    const oldData: SkillsPageProps | undefined = data.find(
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
