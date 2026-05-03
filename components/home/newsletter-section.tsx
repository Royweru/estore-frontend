"use client";

import { useState, FormEvent } from "react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 sm:px-8 border-t-2 border-zinc-950 bg-[#F5F1E6]">
      <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
        {/* Mail Icon */}
        <div className="inline-block p-3 sm:p-4 border-2 border-zinc-950">
          <span className="material-symbols-outlined text-3xl sm:text-4xl">
            mail
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-epilogue font-bold uppercase text-zinc-950 text-3xl sm:text-4xl md:text-headline-lg">
          Join The Culture
        </h2>

        {/* Description */}
        <p className="text-zinc-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Get early access to drops, exclusive lookbooks, and community events.
          We don&apos;t spam, we inform.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
          <input
            className="flex-1 bg-transparent border-2 border-zinc-950 px-5 sm:px-6 py-3 sm:py-4 font-epilogue font-semibold text-sm uppercase tracking-wider placeholder:text-zinc-400 focus:ring-0 focus:border-[#9E2A1C] outline-none transition-colors"
            placeholder="YOUR EMAIL ADDRESS"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-zinc-950 text-white px-8 sm:px-10 py-3 sm:py-4 font-epilogue font-semibold uppercase tracking-widest text-sm hover:bg-[#9E2A1C] transition-colors active:scale-[0.98]"
            type="submit"
          >
            {submitted ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>

        {/* Success feedback */}
        {submitted && (
          <p className="text-[#9E2A1C] font-epilogue font-semibold text-sm uppercase tracking-wider animate-pulse">
            Welcome to the culture. Check your inbox.
          </p>
        )}
      </div>
    </section>
  );
};
