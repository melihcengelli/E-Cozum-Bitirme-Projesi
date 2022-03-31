import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false
}

const addlistopen = createSlice( {
  name : 'addlistopen',
  initialState : initialState,
  reducers : {
      addlistmodalopen : state => {
          state.open=!state.open
          
      },
      addlistmodalclose : state => {
          state.open=!state.open
          
      }
  }
})
export const { addlistmodalopen, addlistmodalclose } = addlistopen.actions;
export default addlistopen.reducer;