import { Models } from '.'
import { Types } from 'mongoose'
import { UserRole } from '.'

export interface CheckExistenceOptions {
  model: keyof Models
  db: Models
  field?: string
  value?: any
  message?: string
  where?: Record<string, any>
  errorCode?: string
  extensions?: Record<string, any>
}

export interface TokenPayload {
  sub: Types.ObjectId
  role: UserRole
}
