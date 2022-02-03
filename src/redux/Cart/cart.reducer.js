import CartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils.js";

const INITIAL_STATE = {
  cartItems: [],
  isAdded: false,
  isRemoved: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
        isAdded: true,
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
        isRemoved: true,
        isAdded: false,
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        isRemoved: true,
        isAdded: false,
      };
    case CartActionTypes.CLEAR_ALERT:
      return {
        ...state,
        isAdded: false,
        isRemoved: false,
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        isAdded: false,
        isRemoved: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
