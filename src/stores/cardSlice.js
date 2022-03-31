import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";

const initialState = {
    card: [],
    cardisError: false,
    cardisSuccess: false,
    cardisLoading: false,
    cardmessage: ''
}

const cardurl = 'http://localhost:80/card'
const commenturl = 'http://localhost:80/comment'




// Create new card
export const createCard = createAsyncThunk(cardurl+'/create', async (cardData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
    
        console.log(cardData)
        return await cardService.createCard(cardData, token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})

// Get cards
export const getCards = createAsyncThunk('http://localhost:80/card', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardService.getCards(token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})

// Delete card
export const deleteCard = createAsyncThunk('http://localhost:80/card/', async (id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardService.deleteCard(id,token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})

// Update card
export const updateCard = createAsyncThunk(cardurl+'/update', async (cardData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardService.updateCard(cardData,token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})

// Add comment
export const addComment = createAsyncThunk(commenturl+'/comment', async (commentData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardService.addComment(commentData,token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})

//Add duedate
export const addDuedate = createAsyncThunk(cardurl+'/duedate', async (duedateData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cardService.addDuedate(duedateData,token)
    } catch (error) {
        const cardmessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(cardmessage)
    }
})



export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCards.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(getCards.fulfilled, (state,action)=> {
            state.cardisLoading = false
            state.cardisSuccess = true
            state.card = action.payload
           
        })
        .addCase(getCards.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError = true
            state.cardmessage = action.payload
            
        })
        .addCase(createCard.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(createCard.fulfilled, (state,action)=> {
            console.log(action.payload)
            state.card.push(action.payload)
            state.cardisLoading = false
            state.cardisSuccess = true
            
            
        })
        .addCase(createCard.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError= true
            state.cardmessage = action.payload
        })
        .addCase(deleteCard.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(deleteCard.fulfilled, (state,action)=> {
            state.card = state.card.filter((card) => Number(card.id) !== Number(action.meta.arg))
            state.cardisLoading = false
            state.cardisSuccess = true
            
            
            
        })
        .addCase(deleteCard.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError= true
            state.cardmessage = action.payload
        })
        .addCase(updateCard.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(updateCard.fulfilled, (state,action)=> {
            
            state.cardisLoading = false
            state.cardisSuccess = true
            
        })
        .addCase(updateCard.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError= true
            state.cardmessage = action.payload
        })
        .addCase(addComment.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(addComment.fulfilled, (state,action)=> {
            
            state.cardisLoading = false
            state.cardisSuccess = true
            
        })
        .addCase(addComment.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError= true
            state.cardmessage = action.payload
        })
        .addCase(addDuedate.pending, (state) => {
            state.cardisLoading = true
        })
        .addCase(addDuedate.fulfilled, (state,action)=> {
            
            state.cardisLoading = false
            state.cardisSuccess = true
            
        })
        .addCase(addDuedate.rejected, (state,action)=> {
            state.cardisLoading = false
            state.cardisError= true
            state.cardmessage = action.payload
        })
        
        
    },
})

export const {reset} = cardSlice.actions
export default cardSlice.reducer