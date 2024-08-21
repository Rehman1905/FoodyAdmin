'ues client'

import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const fetchRetuarant=async()=>{
    try{
        const response=await axios.get(`/api/restuarants`)
        const dataRestuarant=response.data.result.data
        return dataRestuarant
    }catch(err){
        console.error(err)
    }
}
const initialState={
    data:fetchRetuarant(),
}
export const restuarantSlice=createSlice({
    name:'restuarant',
    initialState,
    reducers:{
        deleteRestuarantData:(state,action)=>{
            const id=action.payload
            state.data=state.data.then(result=>result.filter(restuarant=>restuarant.id!==id))
        },
        addRestuarant:(state,action)=>{
            state.data=fetchRetuarant()
        }
    }
})
export const {deleteRestuarantData,addRestuarant}=restuarantSlice.actions
export default restuarantSlice.reducer