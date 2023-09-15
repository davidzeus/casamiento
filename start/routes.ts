import Route from '@ioc:Adonis/Core/Route'

//pagina de inicio
Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

//post login
Route.post('/login', 'AuthController.login').as('login')

// post imagen
Route.post('/image', 'PostImagesController.up')//.as('login')

//obtener imagenes
Route.get('/images', 'PostImagesController.get')