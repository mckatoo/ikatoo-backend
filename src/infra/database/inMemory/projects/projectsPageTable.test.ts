import { randomUUID } from 'crypto'

import projectTable from './projectTable'

describe('Test projects Data InMemory Database', () => {
  const data = {
    snapshot: '/images/test.png',
    description: {
      title: 'Test title',
      subTitle: '2021 - 02',
      content: 'Test content'
    }
  }

  it('Should show default data on projects_page table', () => {
    const { table } = projectTable

    expect(table).toHaveLength(4)
    expect(table).toEqual([
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
    ])
  })

  it('Should insert new data on projects_page table', () => {
    projectTable.insert(data)

    expect(projectTable.table).toHaveLength(5)
    expect(projectTable.table[4]).toHaveProperty('snapshot', '/images/test.png')
    expect(projectTable.table[4]).toHaveProperty('description', {
      title: 'Test title',
      subTitle: '2021 - 02',
      content: 'Test content'
    })
  })

  it('Should insert new data with id on projects_page table', () => {
    const newData = {
      id: randomUUID(),
      snapshot: '/images/random-test.png',
      description: {
        title: 'Test title random',
        subTitle: '2021 - 09',
        content: 'Test content random'
      }
    }

    projectTable.insert(newData)

    expect(projectTable.table).toHaveLength(6)
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

    expect(projectTable.table).toHaveLength(5)
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
