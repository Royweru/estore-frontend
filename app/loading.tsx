import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-skeleton";

export default function HomeLoading() {
  return (
    <div className="w-full space-y-10 pb-10">
      {/* Hero Skeleton */}
      <Skeleton className="w-full h-[500px] rounded-none" />
      
      {/* Services Skeleton */}
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>

      {/* Categories Grid Skeleton */}
      <div className="container mx-auto px-5 space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
          <Skeleton className="col-span-2 row-span-2" />
          <Skeleton className="col-span-1 row-span-1" />
          <Skeleton className="col-span-1 row-span-1" />
          <Skeleton className="col-span-2 row-span-1" />
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <div className="container mx-auto px-5 space-y-4">
        <Skeleton className="h-10 w-64" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}
