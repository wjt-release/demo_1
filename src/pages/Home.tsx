import { Layout } from '@/components/layout';
import {
  HeroCarousel,
  NewArrivals,
  HotProducts,
  NewUserPopup,
} from '@/components/home';

const Home = () => {
  return (
    <Layout>
      <HeroCarousel />
      <NewArrivals />
      <HotProducts />
      <NewUserPopup />
    </Layout>
  );
};

export default Home;
