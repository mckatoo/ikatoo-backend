import { randomUUID } from 'crypto'

import skillsPageTable from './skillsPageTable'

describe('Test Skills Data InMemory Database', () => {
  const data = {
    title: 'Insert test',
    description: 'Description test',
    skills: [
      {
        skillTitle: 'skill 1',
        rankPercent: 30
      }
    ],
    lastJobs: [
      {
        yearMonthStart: '5',
        yearMonthEnd: '6',
        jobTitle: 'Job title test',
        jobDescription: 'Job desc test'
      }
    ]
  }

  it('Should show default data on skills_page table', () => {
    const { table } = skillsPageTable

    expect(table).toHaveLength(1)
    expect(table).toEqual([
      {
        id: '83ee76b5-c877-4eb1-b919-876d177bcf80',
        title: 'Habilidades e Experiências',
        description: `<p>Trabalhei como programador em VBA usando o MS Access em 2003, logo após formado no curso técnico do SENAC. Não dei muita sorte pois a empresa fechou 3 meses após eu entrar.</p>
    <p>Precisando de emprego mudei de área, fui trabalhar em uma grande indústria farmacêutica da cidade e lá fiquei durante 7 anos trabalhando como operador de máquinas na produção de medicamentos injetáveis, mas sempre com um pézinho na programação. Lá eu criei um programa em Delphi 7 com banco em MS Access para controle de produção de medicamentos liofilizados que utilizávamos para melhorar o fluxo de produção do setor e diminuir o tempo nos processos de fabricação.</p>
    <p>Sempre estudando banco de dados e programação, em 2013 surgiu uma oportunidade na faculdade onde trabalhei e estudei até julho de 2021.</p>
    <p>Lá atuei principalmente na manutenção e implementação de rede de computadores com 3 laboratórios de informática, departamentos administrativos e outros departamentos academicos. Implementei uma revista eletronica "Consciesi" e desenvolvi pequenas ferramentas para auxiliar o sistema administrativo e acadêmico.</p>
    <p>Atualmente estou desempregado procurando novas oportunidades.</p>
    <p>Visite meu perfil no <a target="_blank" href="https://linkedin.com/in/mckatoo">LinkedIn</a> para mais detalhes ou entre em <a href="/contact">contato</a> comigo.`,
        skills: [
          { skillTitle: 'Back-end', rankPercent: 20 },
          { skillTitle: 'Modelagem de dados', rankPercent: 30 },
          { skillTitle: 'Front-end', rankPercent: 70 },
          { skillTitle: 'Trabalho em equipe', rankPercent: 85 }
        ],
        lastJobs: [
          {
            jobTitle: 'Calm Organizador de Criptomoedas',
            jobDescription: 'Projeto pessoal para estudo.',
            yearMonthStart: '2022 - 03'
          },
          {
            jobTitle: 'Uniesi - Centro Universitário de Itapira',
            jobDescription: 'Responsável pela infraestrutura local e suporte dos serviços dispostos pela mantenedora UNIP.',
            yearMonthStart: '2013 - 06',
            yearMonthEnd: '2021 - 07'
          },
          {
            jobTitle: 'Itacom Veículos',
            jobDescription: 'Desenvolvimento do módulo venda de veículos do sistema de gerenciamento geral.',
            yearMonthStart: '2003 - 10',
            yearMonthEnd: '2003 - 12'
          }
        ]
      }
    ])
  })

  it('Should insert new data on skills_page table', () => {
    skillsPageTable.insert({
      ...data,
      title: 'New insert test'
    })

    expect(skillsPageTable.table).toHaveLength(2)
    expect(skillsPageTable.table[1]).toHaveProperty('title', 'New insert test')
    expect(skillsPageTable.table[1]).toHaveProperty(
      'description',
      'Description test'
    )
  })

  it('Should insert new data with id on skills_page table', () => {
    const newData = {
      id: randomUUID(),
      ...data
    }

    skillsPageTable.insert(newData)

    expect(skillsPageTable.table).toHaveLength(3)
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

    expect(skillsPageTable.table).toHaveLength(2)
  })

  it('Should return an error when trying to delete a non-existent id', () => {
    expect(() => skillsPageTable.delete(randomUUID())).toThrowError(
      'The id does not exist.'
    )
  })

  it('Should update the second register', () => {
    const secondRegister = skillsPageTable.table[1]

    skillsPageTable.update(secondRegister.id!, {
      title: 'Updated data',
      description:
        'Updated data description.'
    })

    expect(skillsPageTable.table[1]).toHaveProperty(
      'title',
      'Updated data'
    )
    expect(skillsPageTable.table[1]).toHaveProperty(
      'description',
      'Updated data description.'
    )
  })

  it('Should return an error when trying to update a non-existent id', () => {
    expect(() => skillsPageTable.update(randomUUID(), {})).toThrowError(
      'The id does not exist.'
    )
  })
})
