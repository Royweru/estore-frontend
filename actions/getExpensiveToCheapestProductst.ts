import { GetProducts } from './getProducts'

export const expensiveToCheapestProducts = async () => GetProducts({ sort: 'price_desc' })
