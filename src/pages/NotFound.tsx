import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button } from '@/components/common';

export function NotFound() {
  return (
    <Layout>
      <Header />
      <main className="page-container flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h1 className="font-display text-6xl md:text-8xl font-medium text-primary mb-4">
            404
          </h1>
          <p className="text-xl text-gray-500 mb-8">页面不存在</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上页
            </Button>
            <Link to="/">
              <Button variant="primary">
                <Home className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </Layout>
  );
}
