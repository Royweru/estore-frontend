"use client";

import { Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

export const SizeFilterBox = ({ sizes }: { sizes: Size[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = async (id: string) => {
    let query = {}
  
    if(searchParams) query = qs.parse(searchParams.toString())

  const updatedQuery = {
    ...query,
    sizeId:id
  }

  if(searchParams.get('sizeId')===id ) delete updatedQuery.sizeId

  const pushUrl = qs.stringifyUrl({
    url:'/browse', //the current page you want to stringify,
    query:updatedQuery
  },{
    skipNull:true,
    skipEmptyString:true
  })

  router.push(pushUrl)
  };

  return (
    <div className="space-y-4 px-1">
      <p className="text-lg font-bold tracking-widest uppercase text-pallete-orange px-1">
        Sizes
      </p>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => {
          const isActive = searchParams.get('sizeId') === size.id;
          return (
            <div
              key={size.id}
              className={`h-10 flex items-center justify-center border transition-all cursor-pointer
                ${isActive 
                  ? "bg-pallete-orange border-pallete-orange text-white" 
                  : "bg-transparent border-pallete-beige text-foreground hover:border-pallete-orange"
                }`}
              onClick={() => onClick(size.id)}
            >
              <p className="text-sm font-medium">{size.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
