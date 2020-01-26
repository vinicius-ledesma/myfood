import { ContextParameters } from 'graphql-yoga/dist/types'
import { Models, AuthUser } from '.'

export interface Context extends ContextParameters {
  db: Models
  authUser: AuthUser
}
