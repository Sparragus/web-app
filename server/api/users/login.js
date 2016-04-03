import config from 'config'
import User from '../../models/user'
import { compare } from '../../util/bcrypt'
import jwt from 'koa-jwt'

export default async function login (ctx, next) {
  const body = ctx.request.body
  const { email, password } = body

  const user = await User.findOne({email: email.toLowerCase()})
  ctx.assert(user, 401, 'Wrong email or password')

  const correctPassword = await compare(password, user.password)
  ctx.assert(correctPassword, 401, 'Wrong email or password')

  const token = jwt.sign({
    email: user.email,
    roles: user.roles
  }, config.jwt.secret)

  user.lastLogin = new Date()
  await user.save()

  ctx.body = {
    success: true,
    token
  }
}
