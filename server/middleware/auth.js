import config from 'config'
import jwt from 'koa-jwt'

export default function auth () {
  // TODO: It's not enough to validate jwt. We must also verify that user exists.
  return jwt({secret: config.jwt.secret})
}
