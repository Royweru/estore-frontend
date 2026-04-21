import { GetProducts } from './getProducts'

export const cheapestToExpensiveProducts = async () => GetProducts({ sort: 'price_asc' })
