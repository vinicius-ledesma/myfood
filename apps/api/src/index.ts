import server from './server'
import { connect } from './models'
import { cors, playground } from './config'

const { PORT: port = 4000 } = process.env

const main = async (): Promise<void> => {
  await connect()
  await server.start({ port, cors, playground })
  console.log(`Listening at port ${port}...`)
}

main().catch(console.log)
