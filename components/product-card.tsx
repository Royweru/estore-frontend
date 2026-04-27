"use client";
import { useCart } from "@/hooks/use-cart";
import { useProductModal } from "@/hooks/use-product-modal";
import { Category, Product, ProductImage, Size } from "@/types";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { FaStar } from "react-icons/fa"; // For the star rating

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProductCard = ({
  data,
  rating,
  categoryName
}: {
  data: Product & {
    images: ProductImage[];
    category?: Category;
    size: Size;
  };
  rating: number;
  categoryName?:string
}) => {
  const {addItem} = useCart()
  const {onOpen} = useProductModal()
  const [loading, setLoading] = useState(false);

  const displayRating = data.averageRating ?? rating;
  const isOutOfStock = data.inventory && data.inventory.quantity === 0;

  // Function to render stars based on product rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${
            i <= Math.round(rating) ? "text-yellow-500" : "text-gray-300"
          } h-4 w-4`}
        />
      );
    }
    return stars;
  };

  const onAddCart = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isOutOfStock) return;
    setLoading(true);
    try {
      await addItem(data);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = () => {
    onOpen(data)
  };

  return (
    <div
      className="col-span-1 cursor-pointer bg-transparent rounded-lg overflow-hidden border border-transparent 
      transition-all duration-300 hover:scale-[1.02] hover:border-pallete-beige/50 hover:shadow-md group/card"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-y-3 relative w-full p-4">
        {/* Image container */}
        <div className="w-full md:h-[220px] h-[280px] rounded-lg relative group">
          <Image
            fill
            src={data.images[0]?.url}
            className="bg-cover bg-center group-hover:hidden rounded-lg"
            alt={data.name}
          />
          <Image
            fill
            src={data?.images[1]?.url}
            className="bg-cover bg-center group-hover:block hidden rounded-lg"
            alt={data.name}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isOutOfStock && (
              <span className="bg-neutral-900 text-white text-xs font-bold px-2 py-1 rounded-sm tracking-wider uppercase">
                Sold Out
              </span>
            )}
            {!isOutOfStock && displayRating >= 4.5 && (
              <span className="bg-pallete-orange text-white text-xs font-bold px-2 py-1 rounded-sm tracking-wider uppercase">
                Top Rated
              </span>
            )}
          </div>
        </div>

        {/* Content container */}
        <div className="w-full flex flex-col space-y-2 items-start">
          {/* Category */}
          <div className="font-light text-neutral-600 text-sm italic">
            <p>{data.category?.name || categoryName}</p>
          </div>

          {/* Product Name */}
          <h4 className="font-semibold text-md text-pallete-orange truncate">
            {data.name}
          </h4>

          {/* Star Rating */}
          <div className="flex space-x-1 items-center">
            {renderStars(displayRating)}
            {data.averageRating ? (
              <span className="text-xs text-gray-500 ml-1">({data.averageRating.toFixed(1)})</span>
            ) : null}
          </div>

          {/* Price and Availability */}
          <div className="flex items-center justify-between w-full relative px-2">
            <p className="font-light text-neutral-black">
              Kes
              <span className="ml-1 font-black text-lg text-black">
                {data.price.toLocaleString()}
              </span>
            </p>

            <p className="text-xs font-mono font-light text-gray-700/85">
              {isOutOfStock ? "Unavailable" : "Available"}
            </p>
          </div>

          {/* Action Button (Optional, can be customized) */}
          <Button
            isLoading={loading}
            disabled={isOutOfStock}
            className={`px-3 py-1 rounded-md mt-2 transition-all flex items-center gap-x-3 text-white
              ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-pallete-red hover:bg-pallete-red/85'}
            `}
            onClick={onAddCart}
          >
            <ShoppingCartIcon className=" size-5 text-brand-white" />
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};
