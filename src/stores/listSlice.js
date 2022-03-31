import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listService from "./listService";

const initialState = {
    list: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const listurl = 'http://localhost:80/list'

// Create new list
export const createList = createAsyncThunk(listurl+'/create', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.createList(listData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user lists
export const getLists = createAsyncThunk(listurl+'/get', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.getLists(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete list
export const deleteList = createAsyncThunk(listurl+'/delete', async (listid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.deleteList(listid, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createList.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.list.push(action.payload)
        })
        .addCase(createList.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getLists.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLists.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.list = action.payload
        })
        .addCase(getLists.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteList.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteList.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.list = state.list.filter((list) => Number(list.id) !== Number(action.meta.arg))
        })
        .addCase(deleteList.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const {reset} = listSlice.actions
export default listSlice.reducer