'use client'

import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const fetchOffer=async()=>{
    try{
        const response=await axios.get(`/api/offer`)
        const dataOffer=response.data.result.data
        return dataOffer
    }catch(err){
        console.error(err)
    }
}
const initialState={
    data:fetchOffer()
}
export const offerSlice=createSlice({
    name:'offer',
    initialState,
    reducers:{
        deleteOfferData:(state,action)=>{
            const id=action.payload
            state.data=state.data.then(result=>result.filter(offer=>offer.id!==id))
        },
        addOfferData:(state,action)=>{
            state.data=fetchOffer()
        }
    }
})
export const {deleteOfferData,addOfferData}=offerSlice.actions
export default offerSlice.reducer