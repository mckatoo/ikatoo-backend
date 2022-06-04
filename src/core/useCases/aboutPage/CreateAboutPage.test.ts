import CreateAboutPage from './CreateAboutPage'

it('Should create about page data', () => {
  const data = {
    title: 'About Page',
    description: 'About Page Description',
    skills: ['skill1', 'skill2', 'skill3'],
    image: {
      src: 'image.src',
      alt: 'Image Description'
    }
  }

  const aboutPage = new CreateAboutPage(data).execute()

  expect(aboutPage).toEqual({ id: aboutPage.id, ...data })
})
