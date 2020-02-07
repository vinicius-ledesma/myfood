import { Models } from '.'
import { Types } from 'mongoose'
import { UserRole } from '.'

export interface FindDocumentOptions {
  model: keyof Models
  db: Models
  field?: string
  value?: any
  message?: string
  where?: Record<string, any>
  errorCode?: string
  extensions?: Record<string, any>
  select?: string
}

export interface TokenPayload {
  sub: Types.ObjectId
  role: UserRole
}

export interface PaginationArgs {
  skip: number
  limit: number
  orderBy: string[]
  where: Record<string, any>
}

export interface GetFieldsOptions {
  include?: string[]
  skip?: string[]
}
