"use client";

import Link from "next/link";

const quickLinks = [
  { label: "Shipping & Returns", href: "/about" },
  { label: "Sustainability", href: "/about" },
  { label: "Store Locator", href: "/about" },
  { label: "Contact", href: "/about" },
];

const supportLinks = [
  { label: "Privacy Policy", href: "/about" },
  { label: "Terms of Service", href: "/about" },
  { label: "Cookie Settings", href: "/about" },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t-4 border-[#9E2A1C]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 px-6 md:px-12 lg:px-16 py-12 lg:py-16">
        {/* Brand Column */}
        <div>
          <div className="text-xl font-black text-white mb-4 font-epilogue">
            URBAN HERITAGE
          </div>
          <p className="font-epilogue font-medium uppercase text-xs tracking-wider text-zinc-500 mb-8 max-w-xs leading-relaxed">
            Modern streetwear designed with respect for the past and vision for
            the future.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-white cursor-pointer hover:text-[#9E2A1C] transition-colors">
              public
            </span>
            <span className="material-symbols-outlined text-white cursor-pointer hover:text-[#9E2A1C] transition-colors">
              near_me
            </span>
            <span className="material-symbols-outlined text-white cursor-pointer hover:text-[#9E2A1C] transition-colors">
              share
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-epilogue font-bold uppercase text-sm mb-6">
            Quick Links
          </h4>
          <ul className="space-y-4">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-epilogue font-medium uppercase text-xs tracking-wider text-zinc-500 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-epilogue font-bold uppercase text-sm mb-6">
            Support
          </h4>
          <ul className="space-y-4">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-epilogue font-medium uppercase text-xs tracking-wider text-zinc-500 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-white font-epilogue font-bold uppercase text-sm mb-6">
            Our Location
          </h4>
          <div className="h-32 w-full rounded overflow-hidden grayscale brightness-75 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcdWdfXw8PuLZyqXJW9lxGwtxKf1ab9aq5szhE30vqsMxeJr7sT_C71r-XNN_V6-qU-JyaXI7wKGnWB0EmyFSUhVN_EeqvvdyW1Mv_kgLDLifRwoG9BTXzIMQoQ8BB3q_EzAwnNpaoL8vT3e4rUDrZHBKh-WvwQHdZ5UG99McxgdevIzL3WOIFEENM1umR0hU1pKfts_AdpgElAEFxF4UUwRJ6WCjpbmT2RcYJCJaj3yhseTXVda1TK9SfXvsws08j3HuneyoARQ"
              alt="Urban Heritage store location map"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-epilogue font-medium uppercase text-[10px] tracking-widest text-zinc-500">
            © 2024 URBAN HERITAGE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
