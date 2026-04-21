import { GetProducts } from './getProducts'

export const oldestToNewestProducts = async () => GetProducts({ sort: 'oldest' })
