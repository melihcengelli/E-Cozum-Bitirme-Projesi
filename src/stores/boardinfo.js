import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const getworkfieldinfo = createSlice({
    name: 'getworkfieldinfo',
    initialState : "",
    reducers : {
        currentworkfieldid : (state,action) => state=action.payload,
   
    }
})

export const { currentworkfieldid } = getworkfieldinfo.actions;
export default getworkfieldinfo.reducer;