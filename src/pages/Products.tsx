import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

type SortKey = "featured" | "new" | "hot" | "price_asc" | "price_desc";
type Category = (typeof categories)[number];

const sizeOptions = ["XS", "S", "M", "L", "XL"] as const;

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"" | Category>("");
  const [size, setSize] = useState<"" | (typeof sizeOptions)[number]>("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.slice();

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.colorName} ${p.category}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (category) list = list.filter((p) => p.category === category);
    if (size) list = list.filter((p) => p.sizes.includes(size));

    list.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "new") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
      if (sort === "hot") return Number(Boolean(b.isHot)) - Number(Boolean(a.isHot));

      const score = (p: typeof products[number]) =>
        (p.isNew ? 2 : 0) + (p.isHot ? 1 : 0);
      return score(b) - score(a);
    });

    return list;
  }, [category, query, size, sort]);

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.32em] text-muted">SHOP</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-fg">商品列表</div>
            <div className="mt-2 text-sm text-muted">共 {filtered.length} 件</div>
          </div>

          <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索：连衣裙 / 外套 / 米色…"
              className="h-11 w-full rounded-xl border border-border bg-bg/70 px-3 text-sm text-fg placeholder:text-muted shadow-soft backdrop-blur focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "" | Category)}
              className="h-11 w-full rounded-xl border border-border bg-bg/70 px-3 text-sm text-fg shadow-soft backdrop-blur focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="">全部品类</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 w-full rounded-xl border border-border bg-bg/70 px-3 text-sm text-fg shadow-soft backdrop-blur focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="featured">推荐</option>
              <option value="new">新品优先</option>
              <option value="hot">热销优先</option>
              <option value="price_asc">价格从低到高</option>
              <option value="price_desc">价格从高到低</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-2 text-xs tracking-[0.22em] text-muted">SIZE</div>
          <button
            type="button"
            onClick={() => setSize("")}
            className={`h-9 rounded-full border px-3 text-xs tracking-wide transition-colors ${
              size === ""
                ? "border-fg/20 bg-fg text-bg"
                : "border-border bg-bg/70 text-fg/75 hover:bg-fg/5 hover:text-fg"
            }`}
          >
            ALL
          </button>
          {sizeOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`h-9 rounded-full border px-3 text-xs tracking-wide transition-colors ${
                size === s
                  ? "border-fg/20 bg-fg text-bg"
                  : "border-border bg-bg/70 text-fg/75 hover:bg-fg/5 hover:text-fg"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-bg/70 p-10 text-center text-sm text-muted shadow-soft backdrop-blur">
            没有找到匹配的商品。
          </div>
        )}
      </div>
    </Container>
  );
}
