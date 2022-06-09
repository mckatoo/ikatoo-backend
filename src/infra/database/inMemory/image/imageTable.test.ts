import { randomUUID } from 'crypto'

import imageTable from './imageTable'

describe('Test Contact Data InMemory Database', () => {
  it('Should show default data on contact_page table', () => {
    const { table } = imageTable

    expect(table).toHaveLength(1)
    expect(table).toEqual([
      {
        id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
        source: 'https://ikatoo.com.br/images/about/about-page-image.jpg',
        alternativeText: 'About image'
      }
    ])
  })

  it('Should insert new data on contact_page table', () => {
    const newData = {
      source: './about-page-image-test.jpg',
      alternativeText: 'About image test'
    }

    imageTable.insert(newData)

    expect(imageTable.table).toHaveLength(2)
    expect(imageTable.table[1]).toHaveProperty('source', './about-page-image-test.jpg')
    expect(imageTable.table[1]).toHaveProperty('alternativeText', 'About image test')
  })

  it('Should insert new data with id on contact_page table', () => {
    const newData = {
      id: randomUUID(),
      source: './image-with-id.jpg',
      alternativeText: 'Image with id'
    }

    imageTable.insert(newData)

    expect(imageTable.table).toHaveLength(3)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      source: './image-with-id.jpg',
      alternativeText: 'Image with id'
    }

    expect(() => imageTable.insert(newData)).toThrowError(
      'The id already exists.'
    )
  })

  it('Should delete the second register', () => {
    imageTable.delete(imageTable.table[1].id!)

    expect(imageTable.table).toHaveLength(2)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => imageTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = imageTable.table[1]

    imageTable.update(secondRegister.id!, {
      source: './updated-image.jpg',
      alternativeText: 'Updated image'
    })

    expect(imageTable.table[1]).toHaveProperty(
      'alternativeText',
      'Updated image'
    )
    expect(imageTable.table[1]).toHaveProperty(
      'source',
      './updated-image.jpg'
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => imageTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
