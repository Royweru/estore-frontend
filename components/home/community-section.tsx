import Link from "next/link";

export const CommunitySection = () => {
  return (
    <section className="py-16 md:py-24 px-6 sm:px-10 md:px-16 lg:px-32 bg-zinc-950 text-white flex flex-col md:flex-row items-center gap-10 md:gap-16 overflow-hidden">
      {/* Left: Text Content */}
      <div className="flex-1 space-y-6 md:space-y-8">
        <h2 className="font-epilogue font-extrabold uppercase leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          BUILT BY
          <br />
          THE STREETS
        </h2>
        <p className="font-body text-zinc-400 max-w-lg text-base md:text-lg leading-relaxed">
          Urban Heritage isn&apos;t just a label. It&apos;s a collective of
          creators, skaters, and visionaries who believe that the pavement is the
          ultimate runway. Every piece we craft is a testament to the raw energy
          of the city.
        </p>
        <div className="pt-2 md:pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 sm:gap-4 text-[#9E2A1C] font-epilogue font-semibold uppercase tracking-[0.2em] text-sm group hover:text-white transition-colors"
          >
            Read Our Brand Story
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
              east
            </span>
          </Link>
        </div>
      </div>

      {/* Right: Rotated Image Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md md:max-w-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Community member in streetwear"
          className="w-full h-52 sm:h-64 object-cover rounded shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc0kUJhR5erad7r15Y6fkX0F4U3rgZHSzTYDCPjUc1owuo1HNOhQYQBPI8HDQvcYXhowb7FPoMVwPqkN45Du4iqyVhZPHr9qOg9ShB9fOp4hCEXH9gK8vM6kdHzf5AyUk13u2bQuJJE1XICYSrn9ouPIEbhnvxW3KU8W2bSEhbMLLcw_4HeYe2rIvB4ahvRXnlgGu_LbbCHs1UxObA2M1g5c7ZQo92gQ98fCitoH1Pck6juMoJWXgp2xQl680FLa5Y8r8UWRlvLw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Sneaker culture on a skateboard"
          className="w-full h-52 sm:h-64 object-cover rounded shadow-2xl -rotate-3 mt-6 sm:mt-8 hover:rotate-0 transition-transform duration-500"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbx_6ctBrs3buLH103ZaPfLM2RQPlU9Vkg2GAavWoZKe0XWkgcvWA2TdsUfgIFwwqpTwN74UCQIDCVTVP5eVw9_OUrZneDqfFLpqOTgYY2vPgnGo-RsnPDh1umywEDzLe0296iMW3fuNX-7URFrt2AjqEE7T-G-hRRDMsJIzihVs_nB6JuMYypbaqwh9HJlyka9bV8XiwoOUnQDTvbVUEza5KQpFdMowxuKHCQ_OJbf1D5iWp42a2eR5S_RCrsxEyYNe_FEhMAyA"
        />
      </div>
    </section>
  );
};
