import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, EmptyState } from '@/components/common';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';

export function Favorites() {
  const { items, removeFavorite, clearFavorites } = useFavoritesStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: typeof items[0]) => {
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize, 1);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <Header />
        <main className="page-container bg-secondary-light min-h-screen">
          <div className="container mx-auto py-16">
            <EmptyState
              type="favorites"
              title="收藏夹是空的"
              description="快去挑选您心仪的商品吧"
              action={
                <Link to="/products">
                  <Button variant="primary">去购物</Button>
                </Link>
              }
            />
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-medium text-primary">
              我的收藏
            </h1>
            <button
              onClick={clearFavorites}
              className="text-sm text-gray-500 hover:text-primary"
            >
              清空收藏夹
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1">
                        新品
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute top-3 right-3 bg-status-error text-white text-xs px-2 py-1">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-sm font-medium text-primary line-clamp-2 hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-medium text-primary">
                      ¥{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ¥{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      加入购物车
                    </Button>
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="p-2 text-gray-400 hover:text-status-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/products" className="text-sm text-gray-500 hover:text-primary flex items-center justify-center gap-1">
              <ShoppingBag className="w-4 h-4" />
              继续购物
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
