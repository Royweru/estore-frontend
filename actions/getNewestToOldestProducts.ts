import { GetProducts } from './getProducts'

export const newestToOldestProducts = async () => GetProducts({ sort: 'newest' })
