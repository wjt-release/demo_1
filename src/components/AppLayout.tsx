import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

