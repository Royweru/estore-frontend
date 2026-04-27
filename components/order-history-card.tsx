import { Order } from "@/types";
import { format } from "date-fns";

export const OrderHistoryCard = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white border border-pallete-beige/50 rounded-lg p-5 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-pallete-beige/30 pb-4">
        <div>
          <p className="text-sm text-neutral-500 font-mono">Order ID: {order.id}</p>
          <p className="text-sm text-neutral-500">
            Placed on {format(new Date(order.createdAt), "MMM dd, yyyy")}
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              order.status === "paid"
                ? "bg-green-100 text-green-800"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </span>
          <p className="text-lg font-bold text-pallete-orange">
            Kes {order.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Assuming we might fetch full items if needed, but for now we just show a summary */}
      <div className="pt-2">
        <p className="text-sm text-neutral-700">
          This order was processed successfully. Please check your email for the detailed receipt.
        </p>
      </div>
    </div>
  );
};
