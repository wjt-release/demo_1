import type { Review } from "@/types/commerce";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p_dress_001",
    authorName: "林小姐",
    rating: 5,
    content: "版型很利落，腰线位置刚好，面料有垂坠感，上身显瘦。",
    createdAt: "2026-02-12",
  },
  {
    id: "r2",
    productId: "p_dress_001",
    authorName: "Y.",
    rating: 4,
    content: "黑色很高级，建议按平时尺码买。肩部结构感比较明显，风格偏干练。",
    createdAt: "2026-02-20",
  },
  {
    id: "r3",
    productId: "p_top_001",
    authorName: "周周",
    rating: 5,
    content: "米色很温柔，搭配深蓝外套很出片。针织密度不错，不透。",
    createdAt: "2026-01-28",
  },
  {
    id: "r4",
    productId: "p_outer_001",
    authorName: "Emma",
    rating: 4,
    content: "廓形很好看，深蓝很显白。袖长略长但可以挽起来。",
    createdAt: "2026-02-03",
  },
  {
    id: "r5",
    productId: "p_top_002",
    authorName: "W.",
    rating: 5,
    content: "衬衫的微光泽很克制，搭西装裤很显质感，通勤友好。",
    createdAt: "2026-02-25",
  },
  {
    id: "r6",
    productId: "p_bottom_003",
    authorName: "小白",
    rating: 4,
    content: "浅灰洗很百搭，直筒不挑腿型。建议第一次穿前稍微熨一下更挺。",
    createdAt: "2026-02-14",
  },
];

export function getReviewsByProductId(productId: string) {
  return reviews.filter((r) => r.productId === productId);
}

