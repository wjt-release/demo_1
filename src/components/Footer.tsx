import { Link } from "react-router-dom";
import { Container } from "@/components/Container";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-display text-lg tracking-[0.18em] text-fg">NOIR</div>
            <div className="mt-2 text-xs leading-relaxed tracking-wide text-muted">
              黑白灰基调，米色与深蓝点缀。以大图与留白为主的女装选购体验。
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm tracking-wide text-fg/75">
            <Link to="/products" className="hover:text-fg">
              商品
            </Link>
            <Link to="/orders" className="hover:text-fg">
              订单
            </Link>
            <Link to="/contact" className="hover:text-fg">
              联系我们
            </Link>
          </div>
        </div>
        <div className="mt-10 text-xs tracking-wide text-muted">
          © {new Date().getFullYear()} NOIR Womenswear. Mock store demo.
        </div>
      </Container>
    </footer>
  );
}

