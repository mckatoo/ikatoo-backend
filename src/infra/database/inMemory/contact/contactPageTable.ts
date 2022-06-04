import { randomUUID } from 'crypto'

type LocalizationType = {
  lat: number;
  lng: number;
};

type ContactPageProps = {
  id?: string;
  title: string;
  description: string;
  localization?: LocalizationType;
};

type ContactPageWithoutId = Omit<ContactPageProps, 'id'>;

type OptionalContactPageProps = Partial<ContactPageWithoutId>;

const data: ContactPageProps[] = [
  {
    id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
    title: 'Entre em contato 😄',
    description: 'Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em usar o formulário.',
    localization: {
      lat: -22.428850083857423,
      lng: -46.830700405308185
    }
  }
]

export default {
  table: data,
  insert: (newPage: ContactPageProps) => {
    const { id } = newPage
    if (data.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) newPage.id = randomUUID()

    data.push(newPage)
  },
  update: (id: string, newData: OptionalContactPageProps) => {
    const oldData: ContactPageProps | undefined = data.find(
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
