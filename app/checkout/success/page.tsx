"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPaymentByReference } from "@/lib/core-commerce-client";
import { useCart } from "@/hooks/use-cart";
import { useSession } from "@/components/providers/session-provider";

type PaymentState = "loading" | "successful" | "pending" | "failed" | "unknown";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useSession();
  const [paymentState, setPaymentState] = React.useState<PaymentState>("loading");
  const [paymentReference, setPaymentReference] = React.useState<string | null>(null);

  React.useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    setPaymentReference(reference);
  }, [searchParams]);

  React.useEffect(() => {
    const run = async () => {
      if (isLoading) {
        return;
      }

      if (!user) {
        setPaymentState("unknown");
        return;
      }

      await useCart.getState().syncWithServer();

      if (!paymentReference) {
        setPaymentState("unknown");
        return;
      }

      try {
        const payment = await getPaymentByReference(paymentReference);
        const status = payment.status;
        if (status === "successful") {
          setPaymentState("successful");
          return;
        }
        if (status === "pending") {
          setPaymentState("pending");
          return;
        }
        if (status === "failed") {
          setPaymentState("failed");
          return;
        }
        setPaymentState("unknown");
      } catch {
        setPaymentState("unknown");
      }
    };

    void run();
  }, [isLoading, user, paymentReference]);

  const content = (() => {
    if (paymentState === "loading") {
      return {
        icon: <Loader2 className="text-neutral-500 w-24 h-24 mb-2 animate-spin" />,
        title: "Checking Payment...",
        description: "We are confirming your payment and syncing your cart.",
      };
    }
    if (paymentState === "successful") {
      return {
        icon: <CheckCircle2 className="text-green-500 w-24 h-24 mb-2" />,
        title: "Payment Successful!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      };
    }
    if (paymentState === "pending") {
      return {
        icon: <AlertCircle className="text-amber-500 w-24 h-24 mb-2" />,
        title: "Payment Pending",
        description: "Your payment is still processing. Check your orders in a moment.",
      };
    }
    if (paymentState === "failed") {
      return {
        icon: <XCircle className="text-red-500 w-24 h-24 mb-2" />,
        title: "Payment Failed",
        description: "Your payment was not completed. You can try checkout again from your cart.",
      };
    }
    return {
      icon: <CheckCircle2 className="text-green-500 w-24 h-24 mb-2" />,
      title: "Checkout Complete",
      description: "Your payment callback was received. Open Orders to confirm final status.",
    };
  })();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center flex flex-col items-center gap-y-4">
        {content.icon}
        <h1 className="text-3xl font-extrabold text-gray-900">{content.title}</h1>
        <p className="text-gray-600 mb-4">{content.description}</p>
        <div className="flex w-full gap-x-4 mt-2">
          <Button className="flex-1 font-semibold" variant="outline" onClick={() => router.push("/")}>
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

function CheckoutSuccessFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center flex flex-col items-center gap-y-4">
        <Loader2 className="text-neutral-500 w-24 h-24 mb-2 animate-spin" />
        <h1 className="text-3xl font-extrabold text-gray-900">Checking Payment...</h1>
        <p className="text-gray-600 mb-4">Please wait while we load your checkout status.</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessFallback />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
