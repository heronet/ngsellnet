import { Supplier } from "./Supplier";

export interface Photo {
  imageUrl: string;
  publicId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  supplier: Supplier;
  category: string;
  subCategory: string;
  categoryId: string;
  buyersCount: number;
  createdAt: Date;
  city: string;
  division: string;
  price: number;
  photos: Photo[];
  thumbnail: Photo;
  brand: string;
}
