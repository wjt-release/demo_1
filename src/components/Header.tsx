import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, UserRound, Search, ReceiptText, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

function NavItem({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-wide text-fg/80 transition-colors",
          "hover:bg-fg/5 hover:text-fg",
          isActive ? "bg-fg/10 text-fg" : null,
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-xl tracking-[0.22em] text-fg">NOIR</span>
          <span className="text-xs tracking-[0.28em] text-muted group-hover:text-fg/80">
            WOMENSWEAR
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItem to="/products">SHOP</NavItem>
          <NavItem to="/orders">
            <ReceiptText className="h-4 w-4" />
            ORDERS
          </NavItem>
          <NavItem to="/contact">
            <Mail className="h-4 w-4" />
            CONTACT
          </NavItem>
        </nav>

        <div className="flex items-center gap-1">
          <NavItem to="/products">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">SEARCH</span>
          </NavItem>
          <NavItem to="/cart">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">CART</span>
          </NavItem>
          <NavItem to="/auth">
            <UserRound className="h-4 w-4" />
            <span className="hidden sm:inline">ACCOUNT</span>
          </NavItem>
        </div>
      </Container>
    </header>
  );
}
