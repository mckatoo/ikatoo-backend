import contactPageTable from '@app/infra/repository/inMemory/contactPageTable'
import { randomUUID } from 'crypto'

describe('Test Contact Data InMemory Database', () => {
  it('Should show default data on contact_page table', () => {
    const { table } = contactPageTable

    expect(table).toHaveLength(1)
    expect(table).toEqual([
      {
        id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
        title: 'Entre em contato 😄',
        description:
          'Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em usar o formulário.',
        localization: {
          lat: -22.428850083857423,
          lng: -46.830700405308185
        }
      }
    ])
  })

  it('Should insert new data on contact_page table', () => {
    const newData = {
      title: 'Title test',
      description:
        'New data description.',
      localization: {
        lat: -23.428850083857423,
        lng: -46.830700405308185
      }
    }

    contactPageTable.insert(newData)

    expect(contactPageTable.table).toHaveLength(2)
    expect(contactPageTable.table[1]).toHaveProperty('localization', {
      lat: -23.428850083857423,
      lng: -46.830700405308185
    })
    expect(contactPageTable.table[1]).toHaveProperty('title', 'Title test')
    expect(contactPageTable.table[1]).toHaveProperty(
      'description',
      'New data description.'
    )
  })

  it('Should insert new data with id on contact_page table', () => {
    const newData = {
      id: randomUUID(),
      title: 'New data',
      description:
        'New data description.',
      localization: {
        lat: -23.428850083857423,
        lng: -46.830700405308185
      }
    }

    contactPageTable.insert(newData)

    expect(contactPageTable.table).toHaveLength(3)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      title: 'New data',
      description:
        'New data description.',
      localization: {
        lat: -23.428850083857423,
        lng: -46.830700405308185
      }
    }

    expect(() => contactPageTable.insert(newData)).toThrowError(
      'The id already exists.'
    )
  })

  it('Should delete the second register', () => {
    contactPageTable.delete(contactPageTable.table[1].id!)

    expect(contactPageTable.table).toHaveLength(2)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => contactPageTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = contactPageTable.table[1]

    contactPageTable.update(secondRegister.id!, {
      title: 'Updated data',
      description:
        'Updated data description.',
      localization: {
        lat: -23.428850083857423,
        lng: -46.830700405308185
      }
    })

    expect(contactPageTable.table[1]).toHaveProperty(
      'title',
      'Updated data'
    )
    expect(contactPageTable.table[1]).toHaveProperty(
      'description',
      'Updated data description.'
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => contactPageTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
