import axios from 'axios'

const API_URL = 'http://localhost:80/board'

// Create new board
const createBoard = async (boardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, {'title':boardData}, config)

    return response.data
}
// Get user boards
const getBoards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    

    return response.data
}

// Delete user board
const deleteBoard = async (boardId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+'/' + boardId, config)
    
    

    return response.request.responseURL.split("/").reverse()[0]
}

// Update user board
const updateBoard = async (boardData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+"/"+boardData.id,{"title":boardData.title}, config)
    
    return response.data
}


const boardService = {
    createBoard,
    getBoards,
    deleteBoard,
    updateBoard,
}

export default  boardService

