import { randomUUID } from 'crypto'

export type ImageProps = {
  id?: string
  src: string;
  alt: string;
}

type ImageWithoutId = Omit<ImageProps, 'id'>

type OptionalImageProps = Partial<ImageWithoutId>

const data: ImageProps[] = [
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
    src: 'https://ikatoo.com.br/images/about/about-page-image.jpg',
    alt: 'About image'
  }
]

export default {
  table: data,
  insert: (newPage: ImageProps) => {
    const { id } = newPage
    if (data.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) newPage.id = randomUUID()

    data.push(newPage)
  },
  update: (id: string, newData: OptionalImageProps) => {
    const oldData: ImageProps | undefined = data.find(
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
