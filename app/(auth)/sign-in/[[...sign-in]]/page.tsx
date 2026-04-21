"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { loginWithPassword } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await loginWithPassword(email, password);
      setUser(session);

      const redirectPath = searchParams.get("redirect") || "/";
      router.push(redirectPath);
      router.refresh();
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-pallete-orange">Sign In</h1>
      <p className="mt-2 text-sm text-neutral-600">Welcome back to Everything Design Store.</p>

      <div className="mt-6 space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full rounded-md border border-neutral-300 px-3 outline-none focus:border-pallete-orange"
        />
        <input
          required
          minLength={8}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 w-full rounded-md border border-neutral-300 px-3 outline-none focus:border-pallete-orange"
        />
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

      <Button
        type="submit"
        disabled={loading}
        className="mt-5 h-11 w-full bg-pallete-red text-white hover:bg-pallete-red/90"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <Button
        type="button"
        variant="link"
        className="mt-2 w-full text-pallete-orange"
        onClick={() => router.push("/sign-up")}
      >
        Create an account
      </Button>
    </form>
  );
}
