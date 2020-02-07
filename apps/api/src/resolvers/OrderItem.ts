import { Resolver, OrderItem } from '../types'
import { getFields } from '../utils'

const product: Resolver<any, OrderItem> = (orderItem, args, { db }, info) =>
  db.Product.findById(orderItem.product).select(getFields(info))

export default {
  product,
}
