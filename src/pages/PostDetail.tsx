import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Bookmark, Share2, MessageCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { useCommunityStore } from '@/store/communityStore';
import { useCartStore } from '@/store/cartStore';
import { getPostById, getCommentsByPostId } from '@/data/posts';
import { Comment } from '@/types';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const { currentPost, setCurrentPost, likePost, unlikePost, favoritePost, unfavoritePost, isLiked, isFavorited } = useCommunityStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    if (id) {
      const post = getPostById(id);
      if (post) {
        setCurrentPost(post);
        setComments(getCommentsByPostId(id));
      }
    }
    return () => setCurrentPost(null);
  }, [id, setCurrentPost]);

  if (!currentPost) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-light flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">帖子不存在</p>
            <Link to="/community" className="text-[#FF6B35]">
              返回社区
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const liked = isLiked(currentPost.id);
  const favorited = isFavorited(currentPost.id);

  const handleLike = () => {
    if (liked) {
      unlikePost(currentPost.id);
    } else {
      likePost(currentPost.id);
    }
  };

  const handleFavorite = () => {
    if (favorited) {
      unfavoritePost(currentPost.id);
    } else {
      favoritePost(currentPost.id);
    }
  };

  const handleAddToCart = (product: typeof currentPost.products[0]) => {
    addItem(product, product.sizes[0], 1);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: currentPost.id,
      userId: 'currentUser',
      userName: '我',
      content: commentText.trim(),
      likesCount: 0,
      createdAt: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentPost.media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentPost.media.length) % currentPost.media.length);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-secondary-light">
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-display text-lg font-medium">帖子详情</h1>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative aspect-[3/4]">
                {currentPost.media[currentImageIndex]?.mediaType === 'video' ? (
                  <video
                    src={currentPost.media[currentImageIndex].url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={currentPost.media[currentImageIndex]?.url || currentPost.media[0]?.url}
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {currentPost.media.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {currentPost.media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {currentPost.media.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto scrollbar-hide">
                  {currentPost.media.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 w-16 h-20 rounded overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-[#FF6B35]' : ''
                      }`}
                    >
                      <img
                        src={media.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={currentPost.userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'}
                    alt={currentPost.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-primary">{currentPost.userName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(currentPost.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>

                <h1 className="font-display text-xl font-medium text-primary mb-3">
                  {currentPost.title}
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {currentPost.content}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {currentPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors ${
                      liked ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{currentPost.likesCount + (liked ? 1 : 0)}</span>
                  </button>
                  <button
                    onClick={handleFavorite}
                    className={`flex items-center gap-2 transition-colors ${
                      favorited ? 'text-[#FF6B35]' : 'text-gray-500 hover:text-[#FF6B35]'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                    <span className="text-sm">{currentPost.favoritesCount + (favorited ? 1 : 0)}</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{comments.length}</span>
                  </div>
                </div>
              </div>

              {currentPost.products.length > 0 && (
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-medium text-primary mb-4">关联商品</h3>
                  <div className="space-y-3">
                    {currentPost.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Link to={`/products/${product.id}`} className="shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-20 object-cover rounded"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${product.id}`}>
                            <h4 className="text-sm font-medium text-primary line-clamp-2 hover:underline">
                              {product.name}
                            </h4>
                          </Link>
                          <p className="text-[#FF6B35] font-medium mt-1">
                            ¥{product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-3 py-1.5 bg-[#FF6B35] text-white text-xs rounded hover:bg-[#FF6B35]/90 transition-colors"
                        >
                          加入购物车
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-medium text-primary mb-4">评论 ({comments.length})</h3>

                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    我
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="说点什么..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#FF6B35]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitComment();
                        }
                      }}
                    />
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                      className="p-2 bg-[#FF6B35] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF6B35]/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          {comment.userName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-primary">
                              {comment.userName}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#FF6B35] transition-colors">
                              <Heart className="w-3 h-3" />
                              {comment.likesCount || 0}
                            </button>
                            <button className="text-xs text-gray-400 hover:text-[#FF6B35] transition-colors">
                              回复
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
