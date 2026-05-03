"use client";

import { useRef } from "react";
import Link from "next/link";

type ProductCardData = {
  title: string;
  subtitle: string;
  price: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: string;
  href: string;
};

const products: ProductCardData[] = [
  {
    title: "Heavyweight Oversized Hoodie",
    subtitle: "Iron Grey / 500GSM",
    price: "$120",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy25Zs1VGCQFX_6h-7N16fdPK36Yh-tjrwGaghRI0xxQtKJUgLoaMkhvsh3aFzLpirVO_RB3wjZmhuQlLIauLcQeKtamNeASqYRQ5Z2afyyFLwoDlWVTFzbr1R4G9j203uUIbfKL9bCLyCHhnLR97H1RLpknqlOyU8q6DfgyZrdD3hSHB79AGGVrbE8h_T2T9gAZZpifP-DMYLv2sy8pS6G2x64Vr_8ajr8F663H64Z8VHCNNloj-EJFFqUfc3OeaOSQFxMYwQaw",
    badge: "New Drop",
    badgeColor: "bg-zinc-950",
    href: "/browse",
  },
  {
    title: "Utility Cargo Pants",
    subtitle: "Olive / Weather-Resistant",
    price: "$185",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAODAkKzzZB-6hnLEh2rarvMmJvKMCdpoH_K4TrygN3z3YKxf4IAjCFtn73f1Hffk8tPbSSO82gj5AyMQLkeal69IU8pTO0QCfbIyv5vN-OCN5aa9SsXAcOaDw9WdesepYEqA9qJVf0TIP8_TiUyTHgGOsG3UNyUTxhSlIbrJy-YFAzdhXMmBIpUWtDVVMzUzrXz-RO-YiXKyoT-89fF0U4y1N3kG51ilBAtr6RrVo30UaJvH8UcuZIKc8r_13PAkw-zoaLnzlirw",
    badge: "Best Seller",
    badgeColor: "bg-[#9E2A1C]",
    href: "/browse",
  },
  {
    title: "Tactical Bomber Jacket",
    subtitle: "Obsidian / Boxy Fit",
    price: "$240",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-UmMWc49zRHDdezfE7a8mhxaXWk51j-losknhBruY_BIa7_cfPq7ka72DkvYFhboWmIUcrO8Nx7Dbap783_Fds4NbpsXg9xTmMz8Y6CplzehM-kFgBnEOuFmJnHiklPIl2BAGJ-B3OyPCnWEQQ7fUuKwo_J15D6DK8R_9G6hXOiX7_2nxBEdv1XT_q6o8BplrGUXsp_evKcI0CBJLI7Wafon2iwgw6daEcgQFw7aV33lRFPSCQE-QgmnKBybnqWEFfUk72pm8EA",
    href: "/browse",
  },
  {
    title: "Heritage Logo Tee",
    subtitle: "Vintage White / 300GSM",
    price: "$65",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCFApCYGnX85o8E3nktSiet7KjakD1G27FVg6szHY_eg8Ka7Iet6ViT2qEJQYrzUJ2uYM5LNkQVJPeupgc6TbEoJjierQUJWbMQJ32gHTWbnqsHxabL4nkxmT2wzMhg9ocEs5nSeh_dG8Z-Nz4zCjTrVHZTE_B4kWHwzra5eDXUV8at0xbW9voP31yQzaikSIVbx5FlgsbkPFgIk7b43LKvJJ31fKos0dMQ56sQaax8y4nqN7Fioc-LvALrd4T07Kv0xVJT-bp3A",
    href: "/browse",
  },
];

const TrendingCard = ({ product }: { product: ProductCardData }) => {
  return (
    <div className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] bg-surface-container-low p-3 sm:p-4 rounded-lg group flex-shrink-0">
      <Link href={product.href}>
        <div className="relative mb-4 sm:mb-6 aspect-[3/4] overflow-hidden rounded">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={product.imageSrc}
          />
          {product.badge && (
            <div
              className={`absolute top-3 sm:top-4 left-3 sm:left-4 ${product.badgeColor} text-white font-epilogue font-semibold px-3 py-1 rounded-sm uppercase text-[10px] tracking-wider`}
            >
              {product.badge}
            </div>
          )}
        </div>
      </Link>

      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="font-epilogue font-bold text-base sm:text-lg uppercase mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm">{product.subtitle}</p>
        </div>
        <p className="font-epilogue font-bold text-[#9E2A1C] text-lg sm:text-xl flex-shrink-0">
          {product.price}
        </p>
      </div>

      <button className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-zinc-950 text-white font-epilogue font-semibold uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E2A1C] transition-colors active:scale-[0.98]">
        <span className="material-symbols-outlined text-sm">add</span>
        Quick Add
      </button>
    </div>
  );
};

export const TrendingNow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 bg-[#F5F1E6]">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <div>
          <span className="font-epilogue font-semibold text-[#9E2A1C] uppercase tracking-widest mb-2 block text-xs sm:text-label-md">
            The Essentials
          </span>
          <h2 className="font-epilogue font-bold text-on-background uppercase text-2xl sm:text-3xl md:text-headline-lg">
            Trending Now
          </h2>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={() => scroll("left")}
            className="p-2 border border-zinc-400 rounded-full hover:bg-zinc-950 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 border border-zinc-400 rounded-full hover:bg-zinc-950 hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Product Cards Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 md:pb-8 custom-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <TrendingCard key={product.title} product={product} />
        ))}
      </div>
    </section>
  );
};
