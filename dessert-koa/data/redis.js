const Redis = require('koa-redis')

const redis = {
  port: 6379,
  host: '127.0.0.1',
  family: 4,
  db: 0
}

const newReids = new Redis(redis)

module.exports = newReids