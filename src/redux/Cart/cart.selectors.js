import { createSelector } from "reselect";

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectIsAdded = createSelector(
  [selectCart],
  (cart) => cart.isAdded
);

export const selectIsRemoved = createSelector(
  [selectCart],
  (cart) => cart.isRemoved
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulateQuantity, cartItem) => accumulateQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulateQuantity, cartItem) =>
      accumulateQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
