import Route from '@ioc:Adonis/Core/Route'

//pagina de inicio
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

//post login
Route.post('/login', 'AuthController.login').as('login')
