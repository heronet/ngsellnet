export interface Photo {
  imageUrl: string;
  publicId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  supplier: string;
  supplierId: string;
  category: string;
  subCategory: string;
  categoryId: string;
  buyersCount: number;
  createdAt: Date;
  price: number;
  photos: Photo[];
}
