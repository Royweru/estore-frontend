"use client";
import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useSession } from "@/components/providers/session-provider";
import { toast } from "sonner";
import { format } from "date-fns";

type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export const ProductReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useSession();

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get(`/catalog/products/${productId}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      void fetchReviews();
    }
  }, [fetchReviews, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.post(`/catalog/products/${productId}/reviews`, {
        rating,
        comment,
      });
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(5);
      void fetchReviews(); // Refresh the list
    } catch (error) {
      const e = error as { response?: { data?: { detail?: string } } };
      const msg = e.response?.data?.detail || "Failed to submit review. Have you purchased this item?";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          } h-4 w-4 ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          onClick={interactive ? () => setRating(i) : undefined}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return <div className="animate-pulse h-24 bg-pallete-beige/20 rounded-md w-full mt-4"></div>;
  }

  return (
    <div className="w-full mt-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold tracking-widest uppercase text-pallete-orange mb-4">Customer Reviews</h3>
        
        {reviews.length === 0 ? (
          <p className="text-sm text-neutral-500 italic">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-pallete-cream/30 p-4 rounded-md border border-pallete-beige/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-1">{renderStars(review.rating)}</div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {format(new Date(review.created_at), "MMM dd, yyyy")}
                  </span>
                </div>
                {review.comment && <p className="text-sm text-foreground/80">{review.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="bg-white p-4 rounded-md border border-pallete-beige/50 shadow-sm mt-4">
          <h4 className="text-md font-semibold text-foreground mb-3">Leave a Review</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-neutral-600">Your Rating:</span>
              <div className="flex space-x-1">{renderStars(rating, true)}</div>
            </div>
            <textarea
              className="w-full border border-pallete-beige rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-pallete-orange"
              rows={3}
              placeholder="What did you think about this product?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-pallete-orange text-white hover:bg-orange-700 w-full md:w-auto"
            >
              Submit Review
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
