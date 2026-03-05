import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
  averageRating?: number;
}

const ReviewList = ({ reviews, averageRating }: ReviewListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-neutral-200 text-neutral-200'
            }
          />
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-500">暂无评价</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {averageRating && (
        <div className="flex items-center gap-4 pb-4 border-b border-neutral-100">
          <div className="text-center">
            <p className="text-3xl font-semibold text-neutral-900">
              {averageRating.toFixed(1)}
            </p>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {reviews.length} 条评价
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="py-4 border-b border-neutral-100 last:border-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {review.userName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-xs text-neutral-400">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              {review.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
