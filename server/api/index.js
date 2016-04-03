import Router from 'koa-router'
import compose from 'koa-compose'

import auth from '../middleware/auth'

// Routes
import signup from './users/signup'
import login from './users/login'

export default function () {
  const publ = new Router()
  const priv = new Router()

  publ.get('*', async function (ctx, next) {
    ctx.body = 'Hello, World!'
  })

  // Public routes

  // User routes
  publ.post('/signup', signup)
  publ.post('/login', login)

  return compose([
    publ.routes(),
    publ.allowedMethods(),
    auth(),
    priv.routes(),
    priv.allowedMethods()
  ])
}
