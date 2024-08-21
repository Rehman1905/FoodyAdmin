'use client'
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchOrders = async () => {
    try {
        let authorization;
        if (typeof window !== 'undefined') {
            authorization = localStorage.getItem('access_token');
        }
        const response = await axios.get(`/api/order`, {
            headers: {
                Authorization: `Bearer ${authorization}`
            }
        })
        const dataOrder=response.data.result.data
        return dataOrder
    }catch(err){
        console.error(err)
    }
}
const initialState={
    data:fetchOrders()
}
export const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        deleteOrderData:(state,action)=>{
            const id=action.payload
            state.data=state.data.then(result=>result.filter(order=>order.id!==id))
        },
        addOrderData:(state,action)=>{
            state.data=fetchOrders()
        }
    }
})
export const {deleteOrderData,addOrderData}=orderSlice.actions
export default orderSlice.reducer