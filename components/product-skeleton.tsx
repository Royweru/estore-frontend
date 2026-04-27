import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="col-span-1 bg-transparent rounded-lg overflow-hidden">
      <div className="flex flex-col gap-y-3 relative w-full p-4">
        {/* Image placeholder */}
        <Skeleton className="w-full md:h-[220px] h-[280px] rounded-lg" />

        {/* Content container */}
        <div className="w-full flex flex-col space-y-2 items-start">
          {/* Category placeholder */}
          <Skeleton className="h-4 w-24" />

          {/* Product Name placeholder */}
          <Skeleton className="h-6 w-full" />

          {/* Star Rating placeholder */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" />
            ))}
          </div>

          {/* Price and Availability placeholder */}
          <div className="flex items-center justify-between w-full px-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Action Button placeholder */}
          <Skeleton className="h-10 w-32 mt-2 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
