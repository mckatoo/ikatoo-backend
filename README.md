# iKatoo Backend

## Development startup instructions

### Create your environment variables files

Into the directory of the project, do:
`cp .env.example .env`
`cp settings.ts.example settings.ts`
**and edit the files with your configuration database**

### Install dependencies and generate prisma client

`yarn install`
`yarn prisma:generate`

### Push database structure from prisma to your database

`yarn prisma:push`
