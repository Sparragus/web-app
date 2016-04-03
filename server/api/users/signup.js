import User from '../../models/user'

export default async function signup (ctx, next) {
  const body = ctx.request.body

  const { name, email, password } = body

  try {
    await User.create({name, email, password})
  } catch (err) {
    if (isDuplicateError('email', err)) {
      onDuplicateError(ctx, 'email', `Email [${email}] already taken`)
    }

    throw err
  }

  ctx.status = 201
  ctx.body = { success: true }
}

/**
 * detects if the error is duplicated
 */
function isDuplicateError (type, err) {
  return err.code === 11000 && err.message.includes(type)
}

/**
* called when signup fails
*/
function onDuplicateError (ctx, reason, message) {
  ctx.set('x-status-reason', reason)
  ctx.throw(409, message)
}

