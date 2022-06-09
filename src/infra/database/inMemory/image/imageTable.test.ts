import { randomUUID } from 'crypto'

import imageTable from './imageTable'

describe('Test Contact Data InMemory Database', () => {
  it('Should show default data on contact_page table', () => {
    const { table } = imageTable

    expect(table).toHaveLength(1)
    expect(table).toEqual([
      {
        id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
        src: 'https://ikatoo.com.br/images/about/about-page-image.jpg',
        alt: 'About image'
      }
    ])
  })

  it('Should insert new data on contact_page table', () => {
    const newData = {
      src: './about-page-image-test.jpg',
      alt: 'About image test'
    }

    imageTable.insert(newData)

    expect(imageTable.table).toHaveLength(2)
    expect(imageTable.table[1]).toHaveProperty('src', './about-page-image-test.jpg')
    expect(imageTable.table[1]).toHaveProperty('alt', 'About image test')
  })

  it('Should insert new data with id on contact_page table', () => {
    const newData = {
      id: randomUUID(),
      src: './image-with-id.jpg',
      alt: 'Image with id'
    }

    imageTable.insert(newData)

    expect(imageTable.table).toHaveLength(3)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      src: './image-with-id.jpg',
      alt: 'Image with id'
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
      src: './updated-image.jpg',
      alt: 'Updated image'
    })

    expect(imageTable.table[1]).toHaveProperty(
      'alt',
      'Updated image'
    )
    expect(imageTable.table[1]).toHaveProperty(
      'src',
      './updated-image.jpg'
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => imageTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
