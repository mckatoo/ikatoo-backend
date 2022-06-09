import aboutPageTable from './aboutPageTable'
import { randomUUID } from 'crypto'

describe('Test About Data InMemory Database', () => {
  it('Should show default data on about_page table', () => {
    const { table } = aboutPageTable

    expect(table).toHaveLength(1)
    expect(table).toEqual([
      {
        id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
        title: 'Olá. Bem vindo❗',
        description: '<p>Me chamo Milton Carlos Katoo, moro em Itapira, interior de São Paulo/Brasil. Pai de uma princesa e filho de excelente cozinheira Italiana e um saldoso Japonês faz tudo, sou um desenvolvedor full-stack que ama programação e desenvolvimento de software afim de melhorar a vida das pessoas.</p><p>Pessoa bem organizada, solucionador de problemas, funcionário independente com alta atenção aos detalhes.Fã de animes, mangas, games, séries de TV e filmes. Uma pessoa de família e pai de uma princesa.</p><p>Interessado em todo o espectro de programação e trabalhar em projetos ambiciosos com pessoas positivas.</p><a class="text-mck_aqua underline underline-offset-8" href="https://ikatoo.com.br/contact/" rel="contact"><span>🎉</span>Vamos fazer algo especial.</a><span>😄</span>'
      }])
  })

  it('Should insert new data on about_page table', () => {
    const newData = {
      title: 'Title test',
      description: 'Describe test'
    }

    aboutPageTable.insert(newData)

    expect(aboutPageTable.table).toHaveLength(2)
    expect(aboutPageTable.table[1]).toHaveProperty('title', 'Title test')
    expect(aboutPageTable.table[1]).toHaveProperty('description', 'Describe test')
  })

  it('Should insert new data with id on about_page table', () => {
    const newData = {
      id: randomUUID(),
      title: 'Title test',
      description: 'Describe test'
    }

    aboutPageTable.insert(newData)

    expect(aboutPageTable.table).toHaveLength(3)
  })

  it('Should return an error when informing an existing id', () => {
    const newData = {
      id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
      title: 'Title test',
      description: 'Describe test'
    }

    expect(() => aboutPageTable.insert(newData)).toThrowError('The id already exists.')
  })

  it('Should delete the second register', () => {
    aboutPageTable.delete(aboutPageTable.table[1].id!)

    expect(aboutPageTable.table).toHaveLength(2)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => aboutPageTable.delete(randomUUID())).toThrowError('The id does not exist.')
  })

  it('Should update the second register', () => {
    const secondRegister = aboutPageTable.table[1]

    aboutPageTable.update(secondRegister.id!, {
      title: 'Title test updated',
      description: 'Describe test updated'
    })

    expect(aboutPageTable.table[1]).toHaveProperty('title', 'Title test updated')
    expect(aboutPageTable.table[1]).toHaveProperty('description', 'Describe test updated')
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => aboutPageTable.update(randomUUID(), {})).toThrowError('The id does not exist.')
  })
})
