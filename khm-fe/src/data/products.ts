export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  stock: number;
  tags: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation technology and premium sound quality.",
    price: 299.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    stock: 10,
    tags: ["wireless", "headphones", "audio"],
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description:
      "A feature-packed smartwatch with health monitoring, notifications, and a sleek design.",
    price: 199.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    rating: 4.5,
    stock: 15,
    tags: ["wearable", "smartwatch", "tech"],
    featured: true,
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description:
      "A comfortable and adjustable office chair designed for long hours of work.",
    price: 249.99,
    category: "Furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1619642662222-65776689e2ec?q=80&w=1664&auto=format&fit=crop",
    rating: 4.6,
    stock: 8,
    tags: ["chair", "office", "ergonomic"],
    featured: false,
  },
  {
    id: "4",
    name: "Ultra HD 4K Monitor",
    description:
      "A 27-inch 4K monitor with vibrant colors and high refresh rate for professional work and gaming.",
    price: 399.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    stock: 5,
    tags: ["monitor", "4K", "display"],
    featured: true,
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description:
      "A compact waterproof bluetooth speaker with excellent sound clarity and battery life.",
    price: 79.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    rating: 4.4,
    stock: 20,
    tags: ["speaker", "bluetooth", "portable"],
    featured: false,
  },
  {
    id: "6",
    name: "Premium Leather Backpack",
    description:
      "A high-quality leather backpack with multiple compartments, perfect for daily commute or travel.",
    price: 149.99,
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1987&auto=format&fit=crop",
    rating: 4.3,
    stock: 12,
    tags: ["backpack", "leather", "fashion"],
    featured: false,
  },
  {
    id: "7",
    name: "Smart Home Hub",
    description:
      "Control all your smart home devices from a single central hub with voice commands.",
    price: 129.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
    stock: 7,
    tags: ["smarthome", "tech", "automation"],
    featured: true,
  },
  {
    id: "8",
    name: "Fitness Tracking Band",
    description:
      "Track your health metrics, exercise, and sleep with this advanced fitness band.",
    price: 89.99,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=2075&auto=format&fit=crop",
    rating: 4.2,
    stock: 25,
    tags: ["fitness", "tracker", "wearable"],
    featured: false,
  },
  {
    id: "9",
    name: "Designer Sunglasses",
    description:
      "Stylish UV-protective sunglasses with a modern design and durable build.",
    price: 159.99,
    category: "Fashion",
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
    rating: 4.1,
    stock: 9,
    tags: ["sunglasses", "fashion", "accessories"],
    featured: false,
  },
  {
    id: "10",
    name: "Mechanical Keyboard",
    description:
      "A responsive mechanical keyboard with customizable RGB lighting for gaming and typing.",
    price: 129.99,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1780&auto=format&fit=crop",
    rating: 4.7,
    stock: 15,
    tags: ["keyboard", "gaming", "computer"],
    featured: true,
  },
];

export const categories = [
  "WOMENS_FASHION",
  "MENS_FASHION",
  "FASHION",
  "ELECTRONICS",
  "FURNITURES",
  "MADE_IN_RWANDA",
  "HOME_AND_LIVING",
  "SUPERMARKETING",
  "MOBILES_AND_TABLETS",
  "COMPUTERS_AND_GAMING",
  "HEALTH_AND_BEAUTY",
  "SPORTS_EQUIPMENT",
  "ART_AND_ENTERTAINMENT",
  "RESTAURANTS",
  "JEWELRY_AND_WATCHES",
  "KIDS_AND_BABIES",
  "AUTO_SPARE_PARTS",
  "VEHICLES_SHOPPING",
];
