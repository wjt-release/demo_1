import { Header, Footer, Layout } from '@/components/layout';
import { HeroCarousel, NewArrivals, ProductSection, WelcomeModal } from '@/components/home';
import { useUIStore } from '@/store/uiStore';
import { getNewArrivals, getHotProducts } from '@/data/products';
import { motion } from 'framer-motion';

export function Home() {
  const { showWelcomeModal, closeWelcomeModal } = useUIStore();
  const newArrivals = getNewArrivals();
  const hotProducts = getHotProducts();

  return (
    <Layout>
      <Header />
      <main className="page-container">
        <HeroCarousel />
        
        <NewArrivals products={newArrivals} />
        
        <ProductSection
          title="热销推荐"
          products={hotProducts}
          linkTo="/products?category=hot"
        />

        <section className="py-12 md:py-16 bg-primary text-white">
          <div className="container mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl md:text-4xl font-medium mb-4"
            >
              品质时尚，优雅生活
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              我们精选每一件单品，只为给您带来最优质的穿着体验。
              从面料到剪裁，每一个细节都经过精心考量。
            </motion.p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-accent-beige mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">品质保证</h3>
                <p className="text-gray-500 text-sm">
                  精选优质面料，严格把控每一道工序
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-accent-beige mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">全国包邮</h3>
                <p className="text-gray-500 text-sm">
                  订单满299元即享全国免费配送
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-accent-beige mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">无忧退换</h3>
                <p className="text-gray-500 text-sm">
                  7天无理由退换货，让您购物无忧
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WelcomeModal isOpen={showWelcomeModal} onClose={closeWelcomeModal} />
    </Layout>
  );
}
