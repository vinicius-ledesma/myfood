import { RedisPubSub } from 'graphql-redis-subscriptions'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { AuthUser, DataLoaders, Models } from '.'

export interface Context extends ContextParameters {
  db: Models
  authUser: AuthUser
  loaders: DataLoaders
  pubsub: RedisPubSub
}
