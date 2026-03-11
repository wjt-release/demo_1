import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, X, Image as ImageIcon, Video, Link2 } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { MediaUploader, VideoParser } from '@/components/community';
import { useCommunityStore } from '@/store/communityStore';
import { useAuthStore } from '@/store/authStore';
import { getAllTags } from '@/data/posts';
import { products } from '@/data/products';
import { Post } from '@/types';

type UploadMode = 'upload' | 'parse';

export function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = useCommunityStore();
  const { user, isAuthenticated } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [media, setMedia] = useState<{ url: string; type: 'image' | 'video' }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<typeof products>([]);
  const [uploadMode, setUploadMode] = useState<UploadMode>('upload');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allTags = getAllTags();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('请填写标题和内容');
      return;
    }

    if (media.length === 0 && !videoUrl) {
      alert('请上传图片或视频');
      return;
    }

    if (!isAuthenticated || !user) {
      alert('请先登录');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      title,
      content,
      postType: videoUrl ? 'video' : media.some(m => m.type === 'video') ? 'mixed' : 'image',
      media: media.map((m, index) => ({
        id: Date.now().toString() + index,
        postId: '',
        url: m.url,
        mediaType: m.type,
        displayOrder: index,
      })),
      videoUrl: videoUrl || undefined,
      tags: selectedTags,
      products: selectedProducts,
      likesCount: 0,
      favoritesCount: 0,
      commentsCount: 0,
      createdAt: new Date(),
    };

    addPost(newPost);
    setIsSubmitting(false);
    navigate('/community');
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : prev.length < 5
        ? [...prev, tag]
        : prev
    );
  };

  const toggleProduct = (product: typeof products[0]) => {
    setSelectedProducts(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleVideoParsed = (result: { success: boolean; videoUrl?: string; thumbnail?: string }) => {
    if (result.success && result.videoUrl) {
      setVideoUrl(result.videoUrl);
      if (result.thumbnail) {
        setMedia([{ url: result.thumbnail, type: 'image' }]);
      }
    }
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
              <h1 className="font-display text-lg font-medium">发布帖子</h1>
            </div>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  </motion.div>
                  发布中
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  发布
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setUploadMode('upload')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      uploadMode === 'upload'
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    上传图片/视频
                  </button>
                  <button
                    onClick={() => setUploadMode('parse')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      uploadMode === 'parse'
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    解析视频链接
                  </button>
                </div>

                {uploadMode === 'upload' ? (
                  <MediaUploader onMediaChange={setMedia} maxCount={9} />
                ) : (
                  <VideoParser onVideoParsed={handleVideoParsed} />
                )}
              </div>

              <div className="bg-white p-6 rounded-lg">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="添加标题（必填）"
                  className="w-full text-lg font-medium placeholder-gray-400 focus:outline-none mb-4"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="分享你的穿搭心得、购物体验..."
                  rows={6}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">添加标签</h3>
                  <span className="text-xs text-gray-400">最多选择5个</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-[#FF6B35] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">关联商品</h3>
                  <button
                    onClick={() => setShowProductSelector(!showProductSelector)}
                    className="text-sm text-[#FF6B35] hover:underline"
                  >
                    {showProductSelector ? '收起' : '添加商品'}
                  </button>
                </div>

                {selectedProducts.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#FF6B35]">
                            ¥{product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleProduct(product)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showProductSelector && (
                  <div className="border-t border-gray-100 pt-4 max-h-60 overflow-y-auto">
                    <div className="space-y-2">
                      {products.slice(0, 10).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => toggleProduct(product)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                            selectedProducts.find(p => p.id === product.id)
                              ? 'bg-[#FF6B35]/10 ring-1 ring-[#FF6B35]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-sm text-primary truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">¥{product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-medium mb-4">发布须知</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• 请确保上传内容为原创或已获授权</li>
                  <li>• 禁止发布违法违规内容</li>
                  <li>• 建议图片尺寸比例 3:4</li>
                  <li>• 视频时长不超过 5 分钟</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
