import { CorsOptions } from 'cors'

const { NODE_ENV, CLIENT_HOSTS } = process.env

const isProduction = NODE_ENV === 'production'

// const playground = isProduction ? false : '/'
const playground = '/'

const hosts = CLIENT_HOSTS || ['localhost:8100', '127.0.0.1:8100'].join('|')
const protocols = isProduction ? 'https|wss' : 'http|ws'
const origin = new RegExp(`^(${protocols})://(${hosts})$`)
const cors: CorsOptions = {
  origin,
}

export { cors, isProduction, playground }
