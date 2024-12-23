import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { variables } from '../../utils/api/variables.js';


// Ngưỡng miễn phí giao hàng
export const DELIVERY_THRESHOLD = 1200;

// Thunk để tải cart từ database hoặc sessionStorage
export const loadCart = createAsyncThunk('cart/loadCart', async (currentUser) => {
    if (currentUser) {
    const response = await axios.get(`${variables.CART_ITEM_API}/${currentUser.customerID}`);
    console.log('response from item database', response.data);
    // Lặp qua danh sách các items và xử lý mỗi item
    const cartItems = (response.data && response.data.length > 0) ?
      response.data.map(item => ({
        cartItemID: item.cartItemID,
        customerID: item.customerID,
        product: item.product,
        productPrice: item.productPrice,
        productSizeID: item.productSizeID,
        productSize: item.productSizeName,
        quantity: item.quantity,
      })) : [];
    console.log('cartItems:', cartItems);

    return cartItems || [];
  } else {
    // Lấy dữ liệu từ sessionStorage
    const localCart = sessionStorage.getItem('cartItems');

    if (!localCart) {
      // Tạo một cart rỗng nếu chưa có
      const emptyCart = [];
      sessionStorage.setItem('cartItems', JSON.stringify(emptyCart));
      console.log('No localCart found. Initialized empty cart:', emptyCart);
      return emptyCart;
    }

    console.log('localCart:', localCart);
    return JSON.parse(localCart);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    delivery: 0,
    discount: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, productPrice, productSizeID, quantity = 1, currentUser } = action.payload;
    
      const existingItem = state.items.find(
        (item) =>
          item.product.productID === product.productID &&
          item.productSizeID === productSizeID
      );
    
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.quantity += quantity;
    
        if (currentUser) {
          axios
            .put(`${variables.CART_ITEM_API}/${existingItem.cartItemID}`, {
              cartItemID: existingItem.cartItemID,
              customerID: currentUser.customerID,
              productSizeID: existingItem.productSizeID,
              quantity: existingItem.quantity,
            })
            .then(() => console.log("Cart item updated in database"))
            .catch((err) => console.error("Error updating cart item:", err.response?.data || err.message));
        } else {
          sessionStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới
        const newItem = {
          product,
          productPrice,
          productSizeID,
          quantity,
        };
    
        // Tạo một bản sao mới để tránh lỗi "object is not extensible"
        const newCartItem = { ...newItem };
    
        state.items.push(newCartItem);
    
        if (currentUser) {
          axios
            .post(`${variables.CART_ITEM_API}`, {
              customerID: currentUser.customerID,
              productSizeID,
              quantity,
            })
            .then((response) => {
              // Thay vì chỉnh sửa trực tiếp, chỉnh sửa bản sao mới
              const index = state.items.findIndex((item) => item === newCartItem);
              if (index !== -1) {
                state.items[index] = {
                  ...state.items[index],
                  cartItemID: response.data.cartItemID,
                };
              }
              console.log("Cart item added to database");
            })
            .catch((err) => console.error("Error adding cart item:", err.response?.data || err.message));
        } else {
          sessionStorage.setItem("cartItems", JSON.stringify(state.items));
        }
      }
    },
  
    removeFromCart: (state, action) => {
      const { cartItemID, productID, productSize, currentUser } = action.payload;
    
      console.log('Removing product:', productID);
      // Tìm item cần xóa
      const itemToRemove = state.items.find(
        (item) => item.product.productID === productID && item.productSize === productSize
      );
    
      if (!itemToRemove) {
        console.error("Item to remove not found in cart");
        return;
      }
      
      // Cập nhật state.items
      state.items = state.items.filter(
        (item) => item.product.productID !== productID || item.productSize !== productSize
      );
    
      console.log('Current cart items after removal:', state.items);
        
      if (currentUser) {
        axios
          .delete(`${variables.CART_ITEM_API}/${cartItemID}`)
          .then(() => console.log('Cart item removed from database'))
          .catch((err) => console.error('Error removing cart item:', err));
      } else {
        sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    
      // Tự động tính lại subtotal, delivery, và total sau khi xóa
      const subtotal = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.subtotal = subtotal;
      state.delivery = subtotal >= DELIVERY_THRESHOLD ? 0 : 60;
      state.total = subtotal + state.delivery - state.subtotal * state.discount;
    },        

    updateQuantity: (state, action) => {
      const { cartItemID, customerID, product, productPrice, productSizeID, productSize, quantity, currentUser } = action.payload;
      // Find the index of the item in the cart
      const cartItemIndex = state.items.findIndex(
        (item) => item.product.productID === product.productID && item.productSize === productSize
      );
      
      if (cartItemIndex !== -1) {
        // Update the quantity of the existing item (create a new state for immutability)
        state.items[cartItemIndex] = {
          ...state.items[cartItemIndex],
          quantity: quantity,
        };
            
        if (currentUser) {
          // Only update the specific cart item in the database
          const updatedCartItem = state.items[cartItemIndex];
      
          const updatedItem = {
            cartItemID: updatedCartItem.cartItemID,
            customerID: currentUser.customerID,
            productSizeID: productSizeID,
            quantity: updatedCartItem.quantity,
          };
      
          // Send the updated cart item to the server
          axios
            .put(`${variables.CART_ITEM_API}/${updatedCartItem.cartItemID}`, updatedItem)
            .then(() => console.log('Cart item updated in database'))
            .catch((err) => console.error('Error updating cart item:', err));
        } else {
          // If the user is not authenticated, update sessionStorage
          sessionStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      }
    },
      

    clearCart: (state, action) => {
      const { currentUser } = action.payload;
      state.items = [];

      if (currentUser) {
        axios
          .delete(`${variables.CART_ITEM_API}/removeCart/${currentUser.customerID}`)
          .then(() => console.log('Cart cleared in database'))
          .catch((err) => console.error('Error clearing cart:', err));
      } else {
        sessionStorage.removeItem('cartItems');
      }
    },

    calculateSubtotal: (state) => {
      const subtotal = state.items.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0
      );

      if (subtotal >= DELIVERY_THRESHOLD) {
        state.delivery = 0;
        state.subtotal = subtotal;
      } else {
        state.delivery = 60;
        state.subtotal = subtotal;
      }
    },

    updateDelivery: (state, action) => {
      state.delivery = action.payload.deliveryCost;
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload.discount;
    },

    getTotal: (state) => {
      state.total = state.subtotal - state.subtotal * state.discount + state.delivery;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      console.log('Cart loaded from database:', action.payload);
      state.items = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateSubtotal,
  updateDelivery,
  applyDiscount,
  getTotal,
} = cartSlice.actions;

export default cartSlice.reducer;