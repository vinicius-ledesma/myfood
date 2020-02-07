import { Resolver, Order } from '../types'
import { getFields } from '../utils'

const user: Resolver<any, Order> = (order, args, { db }, info) =>
  db.User.findById(order.user).select(getFields(info))

export default {
  user,
}
