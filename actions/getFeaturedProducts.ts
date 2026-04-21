import { GetProducts } from './getProducts'

export const GetFeaturedProducts = async () => {
  return GetProducts({ featured: true, sort: 'newest' })
}
