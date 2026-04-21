import { ProductCard } from '@/components/product-card'
import { Category, Product, ProductImage, Size } from '@/types'
import React from 'react'

export const GridDisplay = ({
    products
}:{
    products:(Product&{
        category:Category,
        size:Size,
        images:ProductImage[]
    })[]
}) => {
  return (
    <div className=' w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-2 sm:gap-1 lg:gap-3 '>
        {products.map((product)=>(
            <ProductCard
             key={product.id}
             data={product}
             rating={4}
             />
        ))}
    </div>
  )
}
