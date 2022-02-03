import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from './Cart/cart.reducer'

import productsReducer from './products/products.reducer'


// persisting data locally
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'cart'],
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)
