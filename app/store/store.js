'use client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice'
import categoryReducer from '../features/categorySlice'
import restuarantReducer from '../features/restuarantSlice'
import productReducer from '../features/productSlice'
import offerReducer from '../features/offerSlice'
import orderReducer from '../features/orderSlice'
import historyReducer from '../features/historySlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category:categoryReducer,
    restuarant:restuarantReducer,
    product:productReducer,
    offer:offerReducer,
    orders:orderReducer,
    history:historyReducer
  },
})
export default store