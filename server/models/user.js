import mongoose, { Schema } from 'mongoose'
import {
  email as emailValidator,
  password as passwordValidator
} from './validators'
import { hash } from '../util/bcrypt'

const User = new Schema({
  name: {type: String},
  email: {type: String, required: true, lowercase: true, validate: emailValidator},
  password: {type: String, required: true, validate: passwordValidator},
  roles: [{type: String, enum: ['admin', 'moderator', 'user']}],
  preferences: {type: Object},
  lastLogin: {type: Date},
  archived: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
})

// Indexes
User.index({email: 1}, {unique: true})

// Hash password before saving
User.path('password').set((value) => {
  // If password is not valid, skip hashing. The validator will throw
  // an error later right before saving.
  const invalidPassword = !passwordValidator.every((validator) => validator.validator(value))

  if (invalidPassword) return value

  // Hash password and store it
  return hash(value)
})

// Remove stuff before toObject()
User.set('toObject', {
  transform: function (doc, ret, options) {
    delete ret.__v
    delete ret.password
    delete ret.lastLogin
    delete ret.createdAt
    delete ret.modifiedAt
  }
})

export default mongoose.model('User', User)
