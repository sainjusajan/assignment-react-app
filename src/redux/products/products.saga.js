import { takeLatest, put, all, call } from 'redux-saga/effects'
import request from '../../utils/request';
import { getProductsListSuccess } from './products.actions';
import ProductsActionTypes from './products.types'


export function* getProducts() {
  try {
    const data = yield call(request, "../../data/products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    yield put(getProductsListSuccess(data))
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(ProductsActionTypes.GET_PRODUCTS_LIST_START, getProducts)
}


export function* productsSaga() {
  yield all([
    call(onFetchProductStart),
  ])
}
