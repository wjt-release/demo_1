import { motion } from 'framer-motion';
import { Layout } from '../components/layout';

export const ComingSoon: React.FC = () => {
  return (
    <Layout>
      <div className="page-container flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <h1 className="font-display text-4xl lg:text-5xl text-primary-black mb-4">
            敬请期待
          </h1>
          <p className="text-primary-gray text-lg">
            该页面正在建设中，即将上线
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};
