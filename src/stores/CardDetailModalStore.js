import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    open : false,
    carditem : [],
}

const carddetailopen = createSlice( {
  name : 'carddetailopen',
  initialState : initialState,
  reducers : {
    carddetailmodalopen : (state,action) => {
          state.open=!state.open
          state.carditem=action.payload
          
      },
    carddetailmodalclose : state => {
          state.open=!state.open
          
      }
  }
})
export const { carddetailmodalopen, carddetailmodalclose } = carddetailopen.actions;
export default carddetailopen.reducer;