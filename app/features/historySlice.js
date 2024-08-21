'use client'

import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const fetchHistory=async()=>{
    try{
        let authorization;
        if(typeof window!=='undefined'){
         authorization = localStorage.getItem('access_token');
        }
        const response = await axios.get(`/api/order/history`, {
            headers: {
                Authorization: `Bearer ${authorization}`
            }
        });
        const dataHistory=response.data.result.data
        return dataHistory
    }catch(err){
        console.error(err)
    }
}
const initialState={
    data:fetchHistory()
}
export const historySlice=createSlice({
    name:'history',
    initialState,
    reducers:{
        deleteHistoryData:(state,action)=>{
            const id=action.payload
            state.data=state.data.then(result=>result.filter(history=>history.id!==id))
        },
        addHistoryData:(state,action)=>{
            state.data=fetchOffer()
        }
    }
})
export const {deleteHistoryData,addHistoryData}=historySlice.actions
export default historySlice.reducer