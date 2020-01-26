import {
  Resolver,
  ProductByIDInput,
  UserRole,
  OrderByIdInput,
  ProductDocument,
  OrderDocument,
} from '../types'
import { findDocument } from '../utils'

const orders: Resolver<{}> = (_, args, { db, authUser }) => {
  const { _id, role } = authUser
  const { Order } = db
  const conditions = role === UserRole.USER ? { user: _id } : {}
  return Order.find(conditions)
}

const order: Resolver<OrderByIdInput> = (_, args, { db, authUser }) => {
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

const products: Resolver<{}> = (_, args, { db }) => db.Product.find()
const product: Resolver<ProductByIDInput> = async (_, args, { db }) => {
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
