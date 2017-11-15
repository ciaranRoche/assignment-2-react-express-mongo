const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})

