import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { EmptyState } from '@/components/common';
import { PostCard } from '@/components/community';
import { useCommunityStore } from '@/store/communityStore';
import { mockPosts, getAllTags } from '@/data/posts';

export function Community() {
  const { posts, filters, setPosts, setFilters, resetFilters } = useCommunityStore();
  const tags = getAllTags();

  useEffect(() => {
    setPosts(mockPosts);
  }, [setPosts]);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (filters.tag) {
      result = result.filter(p => p.tags.includes(filters.tag!));
    }

    if (filters.postType !== 'all') {
      result = result.filter(p => p.postType === filters.postType);
    }

    if (filters.sortBy === 'popular') {
      result.sort((a, b) => b.likesCount - a.likesCount);
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [posts, filters]);

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-medium text-primary">
                社区
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                发现时尚穿搭灵感，分享你的美丽日常
              </p>
            </div>
            <Link
              to="/community/create"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF6B35]/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              发布帖子
            </Link>
          </div>

          <div className="bg-white p-4 mb-6 rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索帖子、用户、标签"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select
                  value={filters.postType}
                  onChange={(e) => setFilters({ postType: e.target.value as typeof filters.postType })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="all">全部类型</option>
                  <option value="image">图片</option>
                  <option value="video">视频</option>
                </select>

                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="latest">最新发布</option>
                  <option value="popular">最热门</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setFilters({ tag: null })}
              className={`shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                filters.tag === null
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilters({ tag })}
                className={`shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                  filters.tag === tag
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <EmptyState
              type="default"
              title="暂无帖子"
              description="快去发布第一篇帖子吧"
              action={
                <Link
                  to="/community/create"
                  className="px-6 py-2 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF6B35]/90 transition-colors"
                >
                  发布帖子
                </Link>
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
            >
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
