import validate from 'validator'

export const email = [
  {
    validator: (value) => validate.isEmail(value),
    msg: '{VALUE} is not a valid email address.'
  }
]

export const password = [
  {
    validator: (value) => validate.isLength(value, 8),
    msg: 'Password must be at least 8 characters long.'
  }
]
