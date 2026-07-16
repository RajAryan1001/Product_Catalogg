export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
}

export interface CategoryColors {
  [key: string]: string;
}