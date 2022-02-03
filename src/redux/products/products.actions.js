import ProductsActionTypes from "./products.types"

export const getProductsListStart = () => ({
  type: ProductsActionTypes.GET_PRODUCTS_LIST_START,
})


export const getProductsListSuccess = (payload) => ({
  type: ProductsActionTypes.GET_PRODUCTS_LIST_SUCCESS,
  payload
})

export const getProductsListFailure = (error) => ({
  type: ProductsActionTypes.GET_PRODUCTS_LIST_FAILURE,
  payload: error
})


