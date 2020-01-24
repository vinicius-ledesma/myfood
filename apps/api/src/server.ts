import { resolve } from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { models as db } from './models'
import { Resolver } from './types'

const typeDefs = resolve(__dirname, 'schema.graphql')
const USERS = [
  { id: 1, name: 'Vinicius', email: 'vinicius@email.com' },
  { id: 2, name: 'Luciana', email: 'luciana@email.com' },
]
const createUser: Resolver<{ data: any }> = (
  parent,
  args,
  ctx,
): typeof USERS[0] => {
  console.log('args: ', args)

  const { data } = args
  const user = {
    ...data,
    id: USERS.length + 1,
  }
  USERS.push(user)
  return user
}

const resolvers = {
  Query: {
    users: (): typeof USERS => USERS,
  },
  User: {
    name: (parent): string => {
      console.log('Parent: ', parent)
      return parent.name
    },
  },
  Mutation: {
    createUser,
  },
}

const server = new GraphQLServer({
  resolvers,
  typeDefs,
  context: { db },
})

export default server
