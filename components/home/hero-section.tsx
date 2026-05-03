import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[921px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Street culture photography"
          className="w-full h-full object-cover brightness-75 grayscale-[0.2]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFrEjDVqOI5kyZ3FlHFNjvQUi8tqZju1XZHCBXA-IQFcOCBP-gczj7oBSZKypZ5xx8kymNs8dZYumaVhVHDmPZ6ZZ28XVS7zmkrXgGxA9FKqDHlCLarsw4vMBDzheIg8nHRst5IVXmAUd5xaM4OL2_yai7ua_z_DdvMqHRsv3BnGvQxJSRkSvG9YZZm5gkdazJYjx4loQlO04qzgRkFtMJCR_nlgrfVBauyPSHwuFnYzBPbTOV9Nll7l09yJu_NJ6_JfnzcgtN3w"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-epilogue font-extrabold text-white text-center mb-4 md:mb-6 leading-none max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-headline-xl">
          REDEFINING
          <br />
          STREET CULTURE
        </h1>
        <p className="font-epilogue font-semibold text-white tracking-[0.3em] md:tracking-[0.4em] uppercase mb-8 md:mb-10 text-xs sm:text-sm">
          Authenticity in every stitch
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/browse?sort=newest"
            className="bg-[#9E2A1C] text-white px-8 sm:px-12 py-4 sm:py-5 font-epilogue font-bold uppercase text-xs sm:text-sm tracking-widest active:scale-95 transition-transform rounded-lg hover:bg-[#7d1107]"
          >
            Shop The Drop
          </Link>
          <Link
            href="/browse"
            className="bg-transparent border-2 border-white text-white px-8 sm:px-12 py-4 sm:py-5 font-epilogue font-bold uppercase text-xs sm:text-sm tracking-widest active:scale-95 transition-transform rounded-lg hover:bg-white/10"
          >
            View Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
};
