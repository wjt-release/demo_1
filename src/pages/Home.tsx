import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import { NewUserModal, useNewUserModal } from "@/components/NewUserModal";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const modal = useNewUserModal();
  const newIn = products.filter((p) => p.isNew).slice(0, 4);
  const hot = products.filter((p) => p.isHot).slice(0, 4);

  return (
    <div>
      <section className="pb-8 pt-10">
        <Container>
          <Carousel
            slides={[
              {
                id: "s1",
                image: products[0]?.images[0] ?? "",
                eyebrow: "SPRING EDIT",
                title: "Clean silhouettes, quiet confidence.",
                subtitle: "黑白灰主调，米色与深蓝点缀。以留白与大图呈现更克制的质感。",
              },
              {
                id: "s2",
                image: products[2]?.images[0] ?? "",
                eyebrow: "NAVY ACCENT",
                title: "Navy layers, sharp lines.",
                subtitle: "深蓝点缀的廓形外套，让通勤与日常更利落。",
              },
              {
                id: "s3",
                image: products[1]?.images[0] ?? "",
                eyebrow: "BEIGE TOUCH",
                title: "Soft beige, modern minimal.",
                subtitle: "柔和米色的温度，在极简中增加可亲近的层次。",
              },
            ].filter((s) => s.image)}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm tracking-wide text-muted">移动端友好 · 顺滑动效 · Mock 支付闭环</div>
            <div className="flex items-center gap-3">
              <Link to="/products">
                <Button size="md">
                  立即选购 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="md" variant="secondary">
                  联系官方
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.32em] text-muted">NEW IN</div>
              <div className="mt-2 font-display text-2xl tracking-wide text-fg">新品推荐</div>
            </div>
            <Link to="/products" className="text-sm tracking-wide text-fg/75 hover:text-fg">
              查看全部
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.32em] text-muted">BEST SELLERS</div>
              <div className="mt-2 font-display text-2xl tracking-wide text-fg">热销商品</div>
            </div>
            <Link to="/products" className="text-sm tracking-wide text-fg/75 hover:text-fg">
              查看全部
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {hot.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <NewUserModal open={modal.open} onClose={modal.close} />
    </div>
  );
}
