import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    boxitemsmodal : false,
    boxitemscontent : "",

}
const boxitemsmodal = createSlice({
    name: 'boxitemsmodal',
    initialState : initialState,
    reducers : {
        boxitemsmodalopen : (state,action) => state={boxitemsmodal:!state.boxitemsmodal,boxitemscontent:action.payload},
        boxitemsmodalclose : state => {
            state.boxitemsmodal=!state.boxitemsmodal
            
        }
   
    }
})

export const { boxitemsmodalopen, boxitemsmodalclose } = boxitemsmodal.actions;
export default boxitemsmodal.reducer;