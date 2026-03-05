import { Layout } from '@/components/layout';
import { EmptyState } from '@/components/common';
import { Construction } from 'lucide-react';

const ComingSoon = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="敬请期待"
          description="该功能正在开发中，请稍后再来"
          icon={<Construction size={32} />}
        />
      </div>
    </Layout>
  );
};

export default ComingSoon;
