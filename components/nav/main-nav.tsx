"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/providers/session-provider";
import { useCart } from "@/hooks/use-cart";
import { GetCategories } from "@/actions/getCategories";
import { Category } from "@/types";

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  navLinks: NavLink[];
  buttons: ButtonProps[];
};

export type Navbar2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const MainNav = () => {
  const [dynamicNavLinks, setDynamicNavLinks] = useState<NavLink[]>(
    Navbar2Defaults.navLinks || []
  );

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await GetCategories();
      const updatedNavLinks = Navbar2Defaults.navLinks?.map((link) => {
        if (link.title === "Collections") {
          return {
            ...link,
            subMenuLinks: [
              { title: "All", url: "/browse" },
              ...cats.map((c: Category) => ({
                title: c.name,
                url: `/browse?categoryId=${c.id}`,
              })),
            ],
          };
        }
        return link;
      });
      if (updatedNavLinks) {
        setDynamicNavLinks(updatedNavLinks);
      }
    };
    fetchCats();
  }, []);

  const { items } = useCart();
  const cartCount = items.reduce((sum, line) => sum + line.quantity, 0);
  const { user, isLoading: isAuthLoading, clearSession } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const router = useRouter();

  const onLogout = async () => {
    await clearSession();
    router.refresh();
    router.push("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F5F1E6]/95 backdrop-blur-md border-b-2 border-zinc-950 flex justify-between items-center px-4 md:px-8 lg:px-12 h-16 md:h-20">
      {/* Left: Logo + Desktop Nav */}
      <div className="flex items-center gap-6 lg:gap-8">
        <Link
          href="/"
          className="text-xl md:text-2xl font-black tracking-tighter text-zinc-950 font-epilogue whitespace-nowrap"
        >
          URBAN HERITAGE
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {dynamicNavLinks.map((navLink, index) => (
            <div key={index}>
              {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                <SubMenu navLink={navLink} isMobile={isMobile} />
              ) : (
                <Link
                  href={navLink.url}
                  className={`font-epilogue font-bold uppercase tracking-widest text-xs transition-colors duration-200 ${
                    index === 0
                      ? "text-[#9E2A1C] border-b-2 border-[#9E2A1C] pb-1"
                      : "text-zinc-950 hover:text-[#9E2A1C]"
                  }`}
                >
                  {navLink.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Icons + Auth */}
      <div className="flex items-center gap-3">
        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {isAuthLoading ? (
            <Loader className="size-5 text-zinc-400 animate-spin" />
          ) : user ? (
            <button
              onClick={onLogout}
              className="font-epilogue font-bold uppercase tracking-widest text-xs text-zinc-950 hover:text-[#9E2A1C] transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="font-epilogue font-bold uppercase tracking-widest text-xs text-zinc-950 hover:text-[#9E2A1C] transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Person Icon */}
        <button
          onClick={() =>
            user ? router.push("/orders") : router.push("/sign-in")
          }
          className="material-symbols-outlined text-zinc-950 active:scale-95 transition-transform text-2xl"
        >
          person
        </button>

        {/* Cart Icon */}
        <button
          onClick={() => router.push("/cart")}
          className="material-symbols-outlined text-zinc-950 active:scale-95 transition-transform relative text-2xl"
        >
          shopping_bag
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#9E2A1C] text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="material-symbols-outlined text-zinc-950 text-2xl"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#F5F1E6] border-b-2 border-zinc-950 px-6 py-6 lg:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-4">
              {dynamicNavLinks.map((navLink, index) => (
                <div key={index}>
                  {navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                    <SubMenu navLink={navLink} isMobile={isMobile} />
                  ) : (
                    <Link
                      href={navLink.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-epilogue font-bold uppercase tracking-widest text-sm text-zinc-950 hover:text-[#9E2A1C] transition-colors block py-2"
                    >
                      {navLink.title}
                    </Link>
                  )}
                </div>
              ))}

              <div className="border-t border-zinc-300 pt-4 mt-2">
                {isAuthLoading ? (
                  <Loader className="size-5 text-zinc-400 animate-spin" />
                ) : user ? (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="font-epilogue font-bold uppercase tracking-widest text-sm text-[#9E2A1C]"
                  >
                    Sign Out
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <Link
                      href="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-epilogue font-bold uppercase tracking-widest text-sm text-[#9E2A1C]"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-epilogue font-bold uppercase tracking-widest text-sm text-zinc-950"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SubMenu = ({
  navLink,
  isMobile,
}: {
  navLink: NavLink;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className="flex w-full items-center gap-2 py-2 font-epilogue font-bold uppercase tracking-widest text-xs text-zinc-950 hover:text-[#9E2A1C] transition-colors lg:text-xs"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                visibility: "visible" as const,
                opacity: 1,
                y: 0,
              },
              close: {
                visibility: "hidden" as const,
                opacity: 0,
                y: -10,
              },
            }}
            transition={{ duration: 0.2 }}
            className="bg-[#F5F1E6] lg:absolute lg:z-50 lg:border lg:border-zinc-300 lg:p-2 lg:mt-2 lg:rounded lg:shadow-md"
          >
            {navLink.subMenuLinks?.map((subMenuLink, index) => (
              <Link
                key={index}
                href={subMenuLink.url}
                className="block py-2 px-4 font-epilogue font-semibold text-sm text-zinc-700 hover:text-[#9E2A1C] hover:bg-zinc-100 transition-colors"
              >
                {subMenuLink.title}
              </Link>
            ))}
          </motion.nav>
        </AnimatePresence>
      )}
    </nav>
  );
};

export const Navbar2Defaults: Navbar2Props = {
  navLinks: [
    { title: "New Arrivals", url: "/browse?sort=newest" },
    {
      title: "Collections",
      url: "#",
      subMenuLinks: [
        { title: "All", url: "/browse" },
      ],
    },
    { title: "Lookbook", url: "/browse" },
    { title: "Sale", url: "/browse?sort=price_asc" },
  ],
};
