import {
  OrderByIdArgs,
  OrderDocument,
  PaginationArgs,
  ProductByIDArgs,
  ProductDocument,
  Resolver,
  UserRole,
} from '../types'
import { findDocument, paginateAndSort } from '../utils'

const orders: Resolver<PaginationArgs> = (_, args, { db, authUser }) => {
  const { _id, role } = authUser
  const { Order } = db
  const conditions = role === UserRole.USER ? { user: _id } : {}
  return paginateAndSort(Order.find(conditions), args)
}

const order: Resolver<OrderByIdArgs> = (_, args, { db, authUser }) => {
  const { _id } = args
  const { _id: userId, role } = authUser
  const where = role === UserRole.USER ? { user: userId, _id } : null
  return findDocument<OrderDocument>({
    db,
    model: 'Order',
    field: '_id',
    value: _id,
    where,
  })
}

const products: Resolver<PaginationArgs> = (_, args, { db }) => {
  const { Product } = db
  return paginateAndSort(Product.find(), args)
}

const product: Resolver<ProductByIDArgs> = async (_, args, { db }) => {
  const { _id } = args
  return findDocument<ProductDocument>({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })
}

export default {
  order,
  orders,
  products,
  product,
}
