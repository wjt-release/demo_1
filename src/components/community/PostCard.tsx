import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, Play } from 'lucide-react';
import { Post } from '@/types';
import { useCommunityStore } from '@/store/communityStore';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const { likePost, unlikePost, favoritePost, unfavoritePost, isLiked, isFavorited } = useCommunityStore();

  const liked = isLiked(post.id);
  const favorited = isFavorited(post.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorited) {
      unfavoritePost(post.id);
    } else {
      favoritePost(post.id);
    }
  };

  const coverImage = post.media[0]?.url || '';
  const isVideo = post.postType === 'video' || post.media[0]?.mediaType === 'video';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="break-inside-avoid mb-4"
    >
      <Link to={`/community/${post.id}`} className="block bg-white overflow-hidden group">
        <div className="relative">
          <img
            src={coverImage}
            alt={post.title}
            className="w-full object-cover"
            style={{ aspectRatio: 'auto' }}
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          {post.media.length > 1 && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
              {post.media.length}图
            </span>
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm font-medium text-primary line-clamp-2 mb-2 group-hover:text-[#FF6B35] transition-colors">
            {post.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'}
                alt={post.userName}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs text-gray-500 truncate max-w-[80px]">{post.userName}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#FF6B35] transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${liked ? 'fill-[#FF6B35] text-[#FF6B35]' : ''}`}
                />
                <span>{post.likesCount + (liked ? 1 : 0)}</span>
              </button>
              <button
                onClick={handleFavorite}
                className="text-gray-500 hover:text-[#FF6B35] transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${favorited ? 'fill-[#FF6B35] text-[#FF6B35]' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
