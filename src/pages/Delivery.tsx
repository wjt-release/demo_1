import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { EmptyState } from '@/components/common';
import { MerchantCard, MerchantFilter } from '@/components/delivery';
import { useDeliveryStore } from '@/store/deliveryStore';
import { deliveryMerchants } from '@/data/deliveryMerchants';

export function Delivery() {
  const { merchants, filters, setMerchants, setFilters, resetFilters } = useDeliveryStore();

  useEffect(() => {
    setMerchants(deliveryMerchants);
  }, [setMerchants]);

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      if (filters.rating && merchant.rating < filters.rating) {
        return false;
      }
      if (filters.deliveryTime && merchant.deliveryTimeMax > filters.deliveryTime) {
        return false;
      }
      if (filters.area && filters.area !== '全国') {
        if (!merchant.deliveryAreas.includes(filters.area) && !merchant.deliveryAreas.includes('全国')) {
          return false;
        }
      }
      if (filters.area === '全国' && !merchant.deliveryAreas.includes('全国')) {
        return false;
      }
      return true;
    });
  }, [merchants, filters]);

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#0066FF]/10 rounded-full">
              <Truck className="w-6 h-6 text-[#0066FF]" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-medium text-primary">
                快递服务
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                选择优质快递商家，享受便捷配送服务
              </p>
            </div>
          </div>

          <MerchantFilter
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />

          {filteredMerchants.length === 0 ? (
            <EmptyState
              type="delivery"
              title="没有符合条件的商家"
              description="请尝试调整筛选条件"
              action={
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
                >
                  清除筛选
                </button>
              }
            />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  共 {filteredMerchants.length} 家商家
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMerchants.map((merchant, index) => (
                  <MerchantCard key={merchant.id} merchant={merchant} index={index} />
                ))}
              </div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-white"
          >
            <h3 className="font-display text-lg font-medium text-primary mb-4">
              配送服务说明
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-primary mb-2">极速配送</h4>
                <p>部分商家支持同城3小时达，让您最快收到心仪商品。</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">专业包装</h4>
                <p>每件商品独立包装，确保运输过程中完好无损。</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">售后保障</h4>
                <p>支持7天无理由退换，让您购物无忧。</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
