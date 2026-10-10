export type Product = {
  id: string;
  name: string;
  price: number;
  size: string;
  description: string;
  shortDescription?: string;
  image: string;
  featured: boolean;
  features?: { title: string; detail: string }[];
  available?: boolean;
  status?: "draft" | "published";
  imagePath?: string | null;
  sortOrder?: number;
};
