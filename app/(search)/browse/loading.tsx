import { ProductGridSkeleton } from "@/components/product-skeleton";

export default function BrowseLoading() {
  return (
    <div className="w-full p-5">
      <div className="mb-6">
        <div className="h-10 w-48 animate-pulse bg-pallete-beige/20 rounded-md" />
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}
