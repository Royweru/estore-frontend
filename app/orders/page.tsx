"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/actions/getOrders";
import { OrderHistoryCard } from "@/components/order-history-card";
import { useSession } from "@/components/providers/session-provider";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/types";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/footer";

export default function OrdersPage() {
  const { user, isLoading: isAuthLoading } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setIsLoadingOrders(true);
      const res = await getOrders(1, 50); // Fetch first 50 orders for now
      setOrders(res.items || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  if (!user) return null; // Wait for redirect

  return (
    <div className="min-h-screen flex flex-col bg-pallete-cream/10">
      <MainNav />
      <main className="flex-grow container mx-auto px-5 py-10 md:px-10 lg:px-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pallete-orange mb-8 tracking-tight">
          My Orders
        </h1>

        {isLoadingOrders ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg bg-pallete-beige/20" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center border border-pallete-beige/50 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-2">No orders found</h2>
            <p className="text-neutral-500 mb-6">Looks like you haven&apos;t made any purchases yet.</p>
            <button
              onClick={() => router.push("/browse")}
              className="bg-pallete-orange text-white px-6 py-2 rounded-md font-bold tracking-widest uppercase hover:bg-orange-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
