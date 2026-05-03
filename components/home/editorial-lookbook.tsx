import Link from "next/link";

type BentoItem = {
  imageSrc: string;
  imageAlt: string;
  label?: string;
  hoverButton?: string;
  gridClass: string;
};

const bentoItems: BentoItem[] = [
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBAT119K7uMDvO97p_Wc1xLMpPbTpCNWleClvsWc47gPpyKAs-TzuIKFUl9_FiuW_tuk70CRnJ4FYUKbgWE-JRk4wXJkG-53CYEBzHTvWVmSOuxhLqvPBY13Yr3HdU8kgyCJ3LPjk1Ecnv1LdJvJ5BpzL7Ofu6-p8yN_0zUgOxZra1p19OOoFjo8gjhNNkJMwe694xbt37J36x0Ke4ni8NRn6BRuFaKpBsSCMJqb4PMLBshf27GFn5q8JyH0evbcJ9Ev0LTNfgNg",
    imageAlt: "Model in high-end streetwear against brutalist architecture",
    label: "Metropolis / 2024",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC4EK0vVmSVRdlnnk4eYFIL5Bj54EUUmp6ZPfHJwfUFO_YL2VzZdrcpHqIApozZzc5V32EGdTBy9jGm7JdADDFXNkm4wDKGpKP3q56paJc4t98BTBub7ilMJhkItHAYTfi27zM67Dv8jQ79OdwnZ9lE2dxG5qwbux1Zg0v7SNp_i3VPnEDcrgAQAznoFpJpMthoh7cPDmWFjEsSeYU9C_5bGViXMe9SAPiTBnHB3l_L3KIvcdmd92d4EpCniaece1SzEnQyaJJDg",
    imageAlt: "Street style photography in Tokyo-inspired setting",
    gridClass: "",
  },
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4IHRVC2-yEGNtXt64yzapSHGk6fB3xUY51-D8AwkRBIUqk3GCJpB8T9txwrTT14OqWpU5VX8ZfGROAV1EmcWuQ-mbfz2oJv8YI8nO0m09aP7BOIs5jx15c0shdAI9hcyYmVVaJjTlmOdVCOu9jygUZ6vbimAhrftP7qIJyrJTKEgMKtMIj8GsK9s_iVuSO_V9KkWkZgiunSUAGayIDjFmCEm89WdHtt66mJkwgnmgeM_EuIdFF4VoVflY6INspV0UEQ-361IAbg",
    imageAlt: "Close up of high-quality garment textures and stitching",
    gridClass: "",
  },
  {
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCUP7gUSK-UsIu8yvfw8tJmZMRJvzyQf0gVNzTmDbS0fwgMsNikSeiM9fLYlpsn-fV0glqokmc67vV_KObg9CdefDHlL2R2EwcT9_0zM7EPhxWKcjewRf8bs_-YmV36JVaFe3QH1sAA4NAyzfZwfZ3TsCwr1_yoSthxcmbv4T09EWLL1ImvdQX_lw9sf_iM3L1aNpEjB8zlJS3ipsWE-ulJbiiU08oF9V6KW9CQTdWL3aLNoj3vlin_pwzYH6Cy-nwTfa0B0rRDA",
    imageAlt: "Fashion editorial shot in minimalist studio",
    hoverButton: "View Editorial",
    gridClass: "md:col-span-2",
  },
];

export const EditorialLookbook = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-8 md:px-16 bg-[#F5F1E6]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-16 gap-4">
        <h2 className="font-epilogue font-bold uppercase text-zinc-950 text-2xl sm:text-3xl md:text-headline-lg">
          Editorial Lookbook Vol. 04
        </h2>
        <Link
          href="/browse"
          className="font-epilogue font-semibold text-zinc-950 uppercase text-xs tracking-widest border-b-2 border-zinc-950 pb-1 hover:text-[#9E2A1C] hover:border-[#9E2A1C] transition-colors whitespace-nowrap"
        >
          View All Stories →
        </Link>
      </div>

      {/* Bento Grid — 4-column, 2-row on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 sm:gap-4 h-auto md:h-[700px] lg:h-[800px]">
        {bentoItems.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded group ${item.gridClass}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={item.imageAlt}
              className="w-full h-64 sm:h-72 md:h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={item.imageSrc}
            />

            {/* Bottom gradient label */}
            {item.label && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
                <span className="text-white font-epilogue font-semibold uppercase tracking-widest text-xs sm:text-sm">
                  {item.label}
                </span>
              </div>
            )}

            {/* Center hover button overlay */}
            {item.hoverButton && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-zinc-950/40">
                <Link
                  href="/browse"
                  className="bg-white text-zinc-950 px-5 sm:px-6 py-2.5 sm:py-3 font-epilogue font-semibold uppercase text-xs sm:text-sm tracking-wider hover:bg-[#9E2A1C] hover:text-white transition-colors"
                >
                  {item.hoverButton}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
