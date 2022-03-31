import React, {useEffect} from 'react'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';






let initialState = []

const url= 'http://localhost:80/board'

let token;
try  { 
   token = localStorage.user.split('"').reverse()[1] 
} catch {

}





const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const getrefresh = (response)=> 
  axios
  .get(url,config)
  


getrefresh()

const workfields = createSlice( {
  name : 'workfieldsdata',
  initialState : initialState,
  reducers : {
    addworkfield : async (state,action) =>  {
      await
      axios
      .post(url,{"title":action.payload},config)
    },
    removeworkfield : (state,action) => {
      axios
      .delete(url+"/"+action.payload,config)
      
    },
    refreshdata : (state,action) => {
      state=action.payload
    }
  }
}

)
export const { addworkfield , removeworkfield, refreshdata} = workfields.actions;


export default workfields.reducer;