import { randomUUID } from 'crypto'

import skillsPageTable from './skillTable'

describe('Test Skills Data InMemory Database', () => {
  const data = {
    title: 'skill test',
    rankPercent: 30
  }

  it('Should show default data on skills_page table', () => {
    const { table } = skillsPageTable

    expect(table).toHaveLength(4)
    expect(table).toEqual([
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf80', title: 'Back-end', rankPercent: 20 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf81', title: 'Modelagem de dados', rankPercent: 30 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf82', title: 'Front-end', rankPercent: 70 },
      { id: '83ee76b5-c877-4eb1-b919-876d177bcf83', title: 'Trabalho em equipe', rankPercent: 85 }
    ])
  })

  it('Should insert new data on skills_page table', () => {
    skillsPageTable.insert({
      title: 'New insert test',
      rankPercent: 25
    })

    expect(skillsPageTable.table).toHaveLength(5)
    expect(skillsPageTable.table[1]).toHaveProperty('title', 'Modelagem de dados')
    expect(skillsPageTable.table[1]).toHaveProperty('rankPercent', 30)
  })

  it('Should insert new data with id on skills_page table', () => {
    const newData = {
      id: randomUUID(),
      title: 'New data with id',
      rankPercent: 34
    }

    skillsPageTable.insert(newData)

    expect(skillsPageTable.table).toHaveLength(6)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      ...data
    }

    expect(() => skillsPageTable.insert(newData)).toThrowError(
      'The id already exists.'
    )
  })

  it('Should delete the second register', () => {
    skillsPageTable.delete(skillsPageTable.table[1].id!)

    expect(skillsPageTable.table).toHaveLength(5)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => skillsPageTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = skillsPageTable.table[1]

    skillsPageTable.update(secondRegister.id!, {
      title: 'Modelagem de dados',
      rankPercent: 30
    })

    expect(skillsPageTable.table[1]).toHaveProperty(
      'title',
      'Modelagem de dados'
    )
    expect(skillsPageTable.table[1]).toHaveProperty(
      'rankPercent',
      30
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => skillsPageTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
