import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice1 = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      // Kiểm tra môi trường client-side trước khi sử dụng localStorage
      if (typeof window !== 'undefined') {
        const itemIndex = state.items.findIndex((item) => item.productID === product.productID);
        if (itemIndex === -1) {
          state.items.push(product);
        }
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      const product = action.payload;

      // Kiểm tra môi trường client-side trước khi sử dụng localStorage
      if (typeof window !== 'undefined') {
        state.items = state.items.filter((item) => item.productID !== product.productID);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      
      // Kiểm tra môi trường client-side trước khi sử dụng localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wishlist');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase('someAsyncAction', (state, action) => {
      // Xử lý các async actions nếu cần
    });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice1.actions;

export default wishlistSlice1.reducer;
