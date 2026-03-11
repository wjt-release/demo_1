import { Link } from 'react-router-dom';
import { Header, Footer, Layout } from '@/components/layout';
import { EmptyState, Button } from '@/components/common';

export function Favorites() {
  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-16">
          <EmptyState
            type="favorites"
            title="收藏夹"
            description="该功能即将上线，敬请期待"
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

export function Coupons() {
  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-16">
          <EmptyState
            type="coupons"
            title="优惠券"
            description="该功能即将上线，敬请期待"
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

export function FlashSale() {
  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-16">
          <EmptyState
            type="flash-sale"
            title="秒杀活动"
            description="该功能即将上线，敬请期待"
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

export function Live() {
  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-16">
          <EmptyState
            type="live"
            title="直播购物"
            description="该功能即将上线，敬请期待"
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
