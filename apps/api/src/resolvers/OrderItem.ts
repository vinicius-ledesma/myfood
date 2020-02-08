import { Types } from 'mongoose'
import { OrderItem, Resolver } from '../types'
import { getFields } from '../utils'

const product: Resolver<any, OrderItem> = (
  orderItem,
  args,
  { loaders },
  info,
) => {
  const { productLoader } = loaders
  return productLoader.load({
    key: orderItem.product as Types.ObjectId,
    select: getFields(info),
  })
}

export default {
  product,
}
