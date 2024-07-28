'use client'
import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const fetchProduct=async()=>{
    try{
        const response=await axios.get('/api/products')
        const dataProduct=response.data.result.data
        return dataProduct
    }catch(err){
        console.error(err)
    }
}
const initialState={
    data:fetchProduct()
}
export const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        deleteProduct:(state,action)=>{
            const id=action.payload
            state.data=state.data.then(result=>result.filter(product=>product.id!==id))
        },
        addProductData:(state,action)=>{
            state.data=fetchProduct()
            
        }
    }
})
export const {deleteProduct,addProductData}=productSlice.actions
export default productSlice.reducer