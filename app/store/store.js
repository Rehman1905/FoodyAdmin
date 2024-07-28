'use client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice'
import categoryReducer from '../features/categorySlice'
import restuarantReducer from '../features/restuarantSlice'
import productReducer from '../features/productSlice'
import offerReducer from '../features/offerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category:categoryReducer,
    restuarant:restuarantReducer,
    product:productReducer,
    offer:offerReducer
  },
})
export default store