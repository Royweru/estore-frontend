import Link from "next/link";

type CollectionCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  borderClass?: string;
};

const CollectionCard = ({
  title,
  href,
  imageSrc,
  imageAlt,
  borderClass = "",
}: CollectionCardProps) => {
  return (
    <Link href={href} className={`flex-1 relative group overflow-hidden cursor-pointer ${borderClass}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex flex-col justify-end p-8 md:p-12">
        <h2 className="font-epilogue font-bold text-white mb-3 md:mb-4 text-2xl md:text-headline-lg uppercase">
          {title}
        </h2>
        <span className="font-epilogue font-semibold text-white uppercase tracking-widest border-b border-white w-max pb-2 text-xs">
          Explore Collection
        </span>
      </div>
    </Link>
  );
};

export const CollectionShowcase = () => {
  return (
    <section className="flex flex-col md:flex-row w-full h-[500px] sm:h-[600px] md:h-[700px]">
      <CollectionCard
        title="WOMEN"
        href="/browse"
        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAZtKLziXaAfVSNNUKKXGzZObyP2eLxohfRghPcCuTU6atrYdq6Z-qvAiAZ2H_6z5BaXG9jHmqMzSs8DMjTVxzOSYgJ4qRU-fmEuERzVDAOlN1-lIRlhlaWuIALYfkReKlIU38EwVJKFfdSMqUo0YNxdIxu8aP7fIfNZ79lHDzKuZHeJmIAEg1JaecoYMVUChudIs_bxJpaKhnT2Q5sx3_q5zcTabTTEnTNmBWfv7d5HyTBPpCGurhIH68nydR7yY254KDB3ae5yA"
        imageAlt="Women's streetwear collection"
      />
      <CollectionCard
        title="MEN"
        href="/browse"
        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAGw9yk4s8RnyN1bZXJSLukhOB4MySYGF4XtvMDESQssOpqVHAx1BUb6mt13uiitcj9Bog4IlqZPz3ctueFbNXqLIWFifYKMM19k-an_gzxb00_ylj5waL0VTLCq3ooRC_ICuRkkuWKFhnCCmRmBkZN7Y8dVftZFxvoisDwqRJcINkfpusG-Jj29EVU3QKOedQaKmCz4a1wFv4Ck-9fp21RRGvWam63x746FBR1mgOFhDiHAdypdqwkZq47i3dg8i3CXUNDiGZ7WQ"
        imageAlt="Men's streetwear collection"
        borderClass="border-t-4 md:border-t-0 md:border-l-4 border-[#9E2A1C]"
      />
    </section>
  );
};
