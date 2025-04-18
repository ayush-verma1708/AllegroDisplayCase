export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: "men" | "women" | "accessories";
  images: string[];
  details: string[];
  sizes: string[];
}
