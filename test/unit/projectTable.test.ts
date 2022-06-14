import projectTable from '@app/infra/repository/inMemory/projectTable'
import { randomUUID } from 'crypto'

describe('Test projects table Data InMemory Database', () => {
  const data = {
    snapshot: '/images/snap-calm.png',
    description: 'Projeto teste',
    title: 'Titulo teste',
    yearMonthEnd: '2022 - 12',
    projectsPageId: '83ee76b5-c877-4eb1-b919-876d177bcf85'
  }

  it('Should show default data on projects_page table', () => {
    const { table } = projectTable

    expect(table).toHaveLength(3)
    expect(table).toEqual([
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
    ])
  })

  it('Should insert new data on projects_page table', () => {
    projectTable.insert(data)

    expect(projectTable.table).toHaveLength(4)
    expect(projectTable.table[3]).toHaveProperty('snapshot', '/images/snap-calm.png')
    expect(projectTable.table[3]).toHaveProperty('description', 'Projeto teste')
  })

  it('Should insert new data with id on projects_page table', () => {
    const newData = {
      id: randomUUID(),
      snapshot: '/images/snap-calm.png',
      description: 'Projeto pessoal para estudo2.',
      title: 'Calm Organizador de Criptomoedas2',
      yearMonthEnd: '2022 - 05',
      projectsPageId: '83ee76b5-c877-4eb1-b919-876d177bcf85'
    }

    projectTable.insert(newData)

    expect(projectTable.table).toHaveLength(5)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      ...data
    }

    expect(() => projectTable.insert(newData)).toThrowError(
      'The id already exists.'
    )
  })

  it('Should delete the second register', () => {
    projectTable.delete(projectTable.table[1].id!)

    expect(projectTable.table).toHaveLength(4)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => projectTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = projectTable.table[1]

    projectTable.update(secondRegister.id!, {
      githubLink: 'Updated data',
      snapshot: 'Updated data description.'
    })

    expect(projectTable.table[1]).toHaveProperty(
      'githubLink',
      'Updated data'
    )
    expect(projectTable.table[1]).toHaveProperty(
      'snapshot',
      'Updated data description.'
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => projectTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
