// src/data/products.ts

export type ProductCategory = "featured" | "rare" | "bundle";

export type Product = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  priceUsd: number;
  category: ProductCategory;
  stock: number;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Pokémon Card – Japanese Booster Pack Vol.1",
    slug: "jp-booster-vol1",
    imageUrl: "/cards/sample-1.jpg",
    priceUsd: 4.99,
    category: "featured",
    stock: 120,
    tags: ["booster", "sealed", "japan"],
  },
  {
    id: "p2",
    name: "Pokémon Card – Japanese Booster Pack Vol.2",
    slug: "jp-booster-vol2",
    imageUrl: "/cards/sample-2.jpg",
    priceUsd: 5.49,
    category: "featured",
    stock: 80,
    tags: ["booster", "sealed", "japan"],
  },
  {
    id: "p3",
    name: "Rare Singles Bundle – 5 Cards",
    slug: "rare-bundle-5",
    imageUrl: "/cards/sample-3.jpg",
    priceUsd: 29.9,
    category: "bundle",
    stock: 20,
    tags: ["bundle", "rare"],
  },
  {
    id: "p4",
    name: "Premium Singles Bundle – 10 Cards",
    slug: "premium-bundle-10",
    imageUrl: "/cards/sample-4.jpg",
    priceUsd: 59.9,
    category: "bundle",
    stock: 10,
    tags: ["bundle", "premium"],
  },
  {
    id: "p5",
    name: "Holo Rare – Sample Card A",
    slug: "holo-rare-a",
    imageUrl: "/cards/sample-5.jpg",
    priceUsd: 12.5,
    category: "rare",
    stock: 6,
    tags: ["single", "holo"],
  },
  {
    id: "p6",
    name: "Holo Rare – Sample Card B",
    slug: "holo-rare-b",
    imageUrl: "/cards/sample-6.jpg",
    priceUsd: 14.0,
    category: "rare",
    stock: 4,
    tags: ["single", "holo"],
  },
  {
    id: "p7",
    name: "Holo Rare – Sample Card C",
    slug: "holo-rare-c",
    imageUrl: "/cards/sample-7.jpg",
    priceUsd: 13.75,
    category: "rare",
    stock: 5,
    tags: ["single", "holo"],
  },
  {
    id: "p8",
    name: "Starter Deck – Sample Set A",
    slug: "starter-deck-a",
    imageUrl: "/cards/sample-8.jpg",
    priceUsd: 24.9,
    category: "featured",
    stock: 15,
    tags: ["deck", "sealed"],
  },
  {
    id: "p9",
    name: "Starter Deck – Sample Set B",
    slug: "starter-deck-b",
    imageUrl: "/cards/sample-9.jpg",
    priceUsd: 27.9,
    category: "featured",
    stock: 12,
    tags: ["deck", "sealed"],
  },
  {
    id: "p10",
    name: "Vintage Single – Sample Card X",
    slug: "vintage-x",
    imageUrl: "/cards/sample-10.jpg",
    priceUsd: 49.9,
    category: "rare",
    stock: 2,
    tags: ["vintage", "single"],
  },
  {
    id: "p11",
    name: "Vintage Single – Sample Card Y",
    slug: "vintage-y",
    imageUrl: "/cards/sample-11.jpg",
    priceUsd: 39.9,
    category: "rare",
    stock: 3,
    tags: ["vintage", "single"],
  },
  {
    id: "p12",
    name: "Bulk Singles – 50 Cards Pack",
    slug: "bulk-50",
    imageUrl: "/cards/sample-12.jpg",
    priceUsd: 19.9,
    category: "bundle",
    stock: 30,
    tags: ["bulk", "bundle"],
  },
];
