import skillTable from '@app/infra/repository/inMemory/skillTable'
import { randomUUID } from 'crypto'

describe('Test Skills Data InMemory Database', () => {
  const data = {
    title: 'skill test',
    rankPercent: 30
  }

  it('Should show default data on skills_page table', () => {
    const { table } = skillTable

    expect(table).toHaveLength(4)
    expect(table).toEqual([
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf80', title: 'Back-end', rankPercent: 20 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf81', title: 'Modelagem de dados', rankPercent: 30 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf82', title: 'Front-end', rankPercent: 70 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf83', title: 'Trabalho em equipe', rankPercent: 85 }
    ])
  })

  it('Should insert new data on skills_page table', () => {
    skillTable.insert({
      title: 'New insert test',
      rankPercent: 25
    })

    expect(skillTable.table).toHaveLength(5)
    expect(skillTable.table[1]).toHaveProperty('title', 'Modelagem de dados')
    expect(skillTable.table[1]).toHaveProperty('rankPercent', 30)
  })

  it('Should insert new data with id on skills_page table', () => {
    const newData = {
      id: randomUUID(),
      title: 'New data with id',
      rankPercent: 34
    }

    skillTable.insert(newData)

    expect(skillTable.table).toHaveLength(6)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      ...data
    }

    expect(() => skillTable.insert(newData)).toThrowError(
      'The id already exists.'
    )
  })

  it('Should delete the second register', () => {
    skillTable.delete(skillTable.table[1].id!)

    expect(skillTable.table).toHaveLength(5)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => skillTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = skillTable.table[1]

    skillTable.update(secondRegister.id!, {
      title: 'Modelagem de dados',
      rankPercent: 30
    })

    expect(skillTable.table[1]).toHaveProperty(
      'title',
      'Modelagem de dados'
    )
    expect(skillTable.table[1]).toHaveProperty(
      'rankPercent',
      30
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => skillTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
