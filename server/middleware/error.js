export default function error () {

  // TODO: Will this work with koa@2?
  return function * error (ctx, next) {
    try {
      yield next
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = {
        success: false,
        error: err.message
      }

      ctx.app.emit('error', err, ctx)
    }
  }
}
