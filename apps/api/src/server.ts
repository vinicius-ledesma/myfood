import { resolve } from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { context } from './config'
import { AuthDirective } from './directives'
import { catchErrorsMiddleware } from './middlewares'
import resolvers from './resolvers'

const typeDefs = resolve(__dirname, 'schema.graphql')

const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context,
  middlewares: [catchErrorsMiddleware],
  schemaDirectives: {
    auth: AuthDirective,
  },
})

export default server
