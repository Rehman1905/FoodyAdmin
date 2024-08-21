'use client'

import { useEffect, useState } from "react"

const { createSlice } = require("@reduxjs/toolkit")
const { default: axios } = require("axios")
const fetchCategories = async () => {
  try {
    const response = await axios.get(`/api/category`);
    const data = response.data.result.data
    return data
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const initialState = {
  data: fetchCategories(),
}
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    deleteCategory: (state, action) => {
      const id = action.payload;
      console.log(state.data)
      state.data = state.data.then(result=>result.filter(category => category.id !== id))
    },
    addCategory: (state, action) => { 
      state.data = fetchCategories()
    },
  }
})
export const { deleteCategory, addCategory} = categorySlice.actions
export default categorySlice.reducer