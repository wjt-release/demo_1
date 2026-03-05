import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pb-20 md:pb-0"
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
      <MobileNav />
    </div>
  );
};

export default Layout;
