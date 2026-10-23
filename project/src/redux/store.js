
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load the saved cart from localStorage
function loadCart() {
  try {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Could not load cart:", error);
  }

  return [];
}

// Create the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: {
      items: loadCart(),
    },
  },
});

// Save the cart whenever Redux state changes
store.subscribe(() => {
  try {
    const cartItems = store.getState().cart.items;

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  } catch (error) {
    console.error("Could not save cart:", error);
  }
});
