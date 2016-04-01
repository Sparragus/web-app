import bcrypt from 'bcryptjs'

export function hash (value) {
  return bcrypt.hashSync(value, 10)
}

export function compare (value, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, res) => {
      return err
        ? reject(err)
        : resolve(res)
    })
  })
}
