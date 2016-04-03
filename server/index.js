// Import utils
import 'babel-polyfill'
import config from 'config'

// Import database
import mongoose from 'mongoose'

// Import Koa and middleware
import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

// Import app related
import api from './api'

// Configre Database
mongoose
  .connect(config.mongodb.uri, config.mongodb.options)
  .connection
  .once('open', () => console.log(`MongoDB up and running at ${config.mongodb.uri}`))
  .on('error', (err) => {
    console.error(`Cannot connect to MongoDB: ${err.message}`)
    throw err
  })
  .on('close', () => console.log('Lost connection to MongoDB'))

// Configure Koa app
const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.use(bodyParser())
app.use(api())

app.listen(3000)
