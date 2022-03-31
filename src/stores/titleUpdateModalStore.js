import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false,
    item : [],
    
}

const titleupdate = createSlice( {
  name : 'titleupdate',
  initialState : initialState,
  reducers : {
      titleupdateopen : (state,action) => {
          state.open=!state.open
          state.item = action.payload
          
      },
      titleupdateclose : state => {
          state.open=!state.open
          
      }
  }
})
export const { titleupdateopen, titleupdateclose } = titleupdate.actions;
export default titleupdate.reducer;