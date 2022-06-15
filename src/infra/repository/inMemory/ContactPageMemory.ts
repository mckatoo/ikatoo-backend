import ContactPageAdapter from '@app/adapter/ContactPageAdapter';
import ContactPage from '@app/core/entities/ContactPage'
import IContactPageRepositories from '@app/core/repositories/IContactPageRepositories'
import { randomUUID } from 'crypto'

type LocalizationType = {
  lat: number;
  lng: number;
}

type ContactPageProps = {
  id?: string;
  title: string;
  description: string;
  localization?: LocalizationType;
}

type ContactPageWithoutId = Omit<ContactPageProps, 'id'>

type OptionalContactPageProps = Partial<ContactPageWithoutId>

// const data: ContactPageProps[] = [
//   {
//     id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
//     title: 'Entre em contato 😄',
//     description: 'Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em usar o formulário.',
//     localization: {
//       lat: -22.428850083857423,
//       lng: -46.830700405308185
//     }
//   }
// ]

export default class ContactPageRepositoryMemory implements IContactPageRepositories {
  contactPage: ContactPage[] = [
    {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      title: 'Entre em contato 😄',
      description: 'Estou interessado em oportunidades CLT, mas não descarto nenhum tipo de trabalho desde que me traga oportunidades de aprendizado. No entanto, se você tiver outra solicitação ou pergunta, não hesite em usar o formulário.',
      localization: '-22.428850083857423 -46.830700405308185'
    }
  ]

  getContactPage (): Promise<ContactPage> {
    throw new Error('Method not implemented.')
  }

  async createContactPage ({ ...contactPage }: ContactPage): Promise<void> {
    const { id } = contactPage
    if (this.contactPage.find((page) => page.id === id)) {
      throw new Error('The id already exists.')
    }
    if (!id) contactPage.id = randomUUID()

    this.contactPage = [ContactPageAdapter.create(contactPage)]
  }

  deleteContactPage (): Promise<void> {
    throw new Error('Method not implemented.')
  }

  // deleteContactPage () {
  //   this.contactPage = []
  // }
}
