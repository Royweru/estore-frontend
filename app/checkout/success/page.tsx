"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center flex flex-col items-center gap-y-4">
        <CheckCircle2 className="text-green-500 w-24 h-24 mb-2" />
        <h1 className="text-3xl font-extrabold text-gray-900">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>
        <div className="flex w-full gap-x-4 mt-2">
          <Button
            className="flex-1 font-semibold"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </Button>
          <Button
            className="flex-1 font-semibold bg-pallete-orange hover:bg-orange-600 text-white"
            onClick={() => router.push("/orders")}
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
}