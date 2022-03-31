import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import boardService from './addworkfieldService'

const initialState = {
    board: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

const boardurl = 'http://localhost:80/board'



// Create new board
export const createBoard = createAsyncThunk(boardurl+'/create', async (boardData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await boardService.createBoard(boardData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user boards
export const getBoards = createAsyncThunk(boardurl+'/get', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await boardService.getBoards(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user board
export const deleteBoard = createAsyncThunk(boardurl+'/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await boardService.deleteBoard(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update user board
export const updateBoard = createAsyncThunk(boardurl+'/update', async (boardData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(boardData)
        return await boardService.updateBoard(boardData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





export const addworkfieldSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createBoard.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createBoard.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.board.push(action.payload)
        })
        .addCase(createBoard.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getBoards.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBoards.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.board = action.payload
        })
        .addCase(getBoards.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteBoard.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteBoard.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.board = state.board.filter((board)=> board.id !== Number(action.payload))
            
        })
        .addCase(deleteBoard.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateBoard.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateBoard.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            
           
            
        })
        .addCase(updateBoard.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const {reset} = addworkfieldSlice.actions
export default addworkfieldSlice.reducer