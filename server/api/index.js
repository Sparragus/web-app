import Router from 'koa-router'
import compose from 'koa-compose'

import auth from '../middleware/auth'

export default function () {
  const publ = new Router()
  const priv = new Router()

  publ.get('*', async function (ctx, next) {
    ctx.body = 'Hello, World!'
    await next()
  })

  return compose([
    publ.routes(),
    publ.allowedMethods(),
    auth(),
    priv.routes(),
    priv.allowedMethods()
  ])
}
