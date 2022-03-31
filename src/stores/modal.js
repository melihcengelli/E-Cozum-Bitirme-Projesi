import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open : false
}

const open = createSlice( {
  name : 'open',
  initialState : initialState,
  reducers : {
      modalopen : state => {
          state.open=!state.open
          
      },
      modalclose : state => {
          state.open=!state.open
          
      }
  }
})
export const { modalopen, modalclose } = open.actions;
export default open.reducer;