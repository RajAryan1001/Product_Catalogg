import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../types/product';
import { fetchProducts } from './productSlice';

const initialState: FilterState = {
  searchTerm: '',
  selectedCategory: '',
  categories: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const categories = action.payload.map(p => p.category);
      state.categories = [...new Set(categories)];
    });
  },
});

export const { setSearchTerm, setSelectedCategory, setCategories } = filterSlice.actions;
export default filterSlice.reducer;