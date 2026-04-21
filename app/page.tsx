import { GetCategories } from "@/actions/getCategories";
import { GetFeaturedProducts } from "@/actions/getFeaturedProducts";
import { GetProducts } from "@/actions/getProducts";
import { FeaturedProducts } from "@/components/featured-products";
import { Footer } from "@/components/footer";

import { Hero } from "@/components/hero";
import { PopularCategories } from "@/components/popular-categories";
import { Services } from "@/components/services";
import { Showcase } from "@/components/showcase";


export default async function Home() {
  const categories = await GetCategories();
  const featuredProducts = await GetFeaturedProducts();
  const hoodiesCategory = categories.find((category) =>
    category?.name?.toLowerCase().includes("hood")
  );
  const showcaseCategory = hoodiesCategory || categories[0];
  const showcaseProducts = showcaseCategory
    ? await GetProducts({ categoryId: showcaseCategory.id, sort: "newest" })
    : [];

  return (
    <>
      <Hero />
      <Services />
      <PopularCategories categories={categories}/>
      <FeaturedProducts products={featuredProducts} />
      <Showcase
        data={showcaseProducts}
        header="Out of this world Hoodies"
        sub="Purchase a T-shirt right now at offer and 50% discount"
        categoryName={showcaseCategory?.name}
      />
      <Footer />
    </>
  );
}
