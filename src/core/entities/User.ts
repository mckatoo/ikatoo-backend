import { BaseEntity } from './BaseEntity'

class User extends BaseEntity {
  id?: string
  name: string
  username: string
  email: string

  private constructor ({ id, name, username, email }: User) {
    super({ id })
    this.name = name
    this.username = username
    this.email = email
  }

  static create ({ name, username, email }: User) {
    const user = new User({ username, name, email })
    return user
  }
}

export { User }
