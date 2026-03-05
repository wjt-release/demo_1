import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        {children}
      </main>
      {showFooter && <Footer />}
      <BottomNav />
    </div>
  );
}
