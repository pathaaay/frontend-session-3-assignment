export interface ProductType {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  thumbnail: string;
  qty: number;
  description: string;
  color?: string;
  size?: string;
}
