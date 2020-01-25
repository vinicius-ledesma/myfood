import {
  ProductCreateInput,
  ProductByIDInput,
  ProductUpdateInput,
  Resolver,
} from '../types'
import { checkExistence } from '../utils'

const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
  const { Product } = db
  const { data } = args
  const product = new Product(data)
  return product.save()
}

const deleteProduct: Resolver<ProductByIDInput> = async (_, args, { db }) => {
  const { Product } = db
  const { _id } = args
  await checkExistence({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })
  return Product.findByIdAndDelete(_id)
}

const updateProduct: Resolver<ProductUpdateInput> = async (_, args, { db }) => {
  const { Product } = db
  const { _id, data } = args
  await checkExistence({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })
  return Product.findByIdAndUpdate(_id, data, { new: true })
}

export default {
  createProduct,
  deleteProduct,
  updateProduct,
}
