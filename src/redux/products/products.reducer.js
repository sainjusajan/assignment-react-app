import ProductsActionTypes from "./products.types";

const INITIAL_STATE = {
  items: false,
  isItemsLoading: false,
  itemsErrorMessage: "",
};

const productsListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.GET_PRODUCTS_LIST_START:
      return {
        ...state,
        isItemsLoading: true,
        itemsErrorMessage: "",
      };
      
    case ProductsActionTypes.GET_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        isItemsLoading: false,
        items: action.payload.items,
      };
      
    case ProductsActionTypes.GET_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        isItemsLoading: false,
        itemsErrorMessage: action.payload,
      };

    default:
      return state
  }
};


export default productsListReducer