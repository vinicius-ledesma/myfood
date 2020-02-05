import { withFilter } from 'graphql-yoga'
import { Types } from 'mongoose'
import {
  Order,
  Resolver,
  SubscriptionArgs,
  SubscriptionPayload,
  SubscriptionResolver,
  UserRole,
} from '../types'

const orderSubscribeFn: Resolver<SubscriptionArgs> = (_, args, ctx) => {
  const { mutationIn } = args.where
  const { pubsub } = ctx
  const channels = mutationIn.map(m => `ORDER_${m}`)
  return pubsub.asyncIterator(channels)
}

const orderFilterFn: Resolver<SubscriptionArgs, SubscriptionPayload<Order>> = (
  payload,
  args,
  ctx,
) => {
  const { _id, role } = ctx.authUser
  return role === UserRole.ADMIN
    ? true
    : (payload.node.user as Types.ObjectId).equals(_id)
}

const order: SubscriptionResolver<Order> = {
  subscribe: withFilter(orderSubscribeFn, orderFilterFn),
  resolve: payLoad => payLoad,
}

export default {
  order,
}
