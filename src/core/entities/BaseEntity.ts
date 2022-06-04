import { randomUUID } from 'crypto'

export abstract class BaseEntity {
  id?: string

  constructor ({ id }: BaseEntity) {
    if (!id) { this.id = randomUUID() }
  }
}
