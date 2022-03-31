import axios from 'axios'


const API_URL = 'http://localhost:80/list?boardId='

const newList_URL = 'http://localhost:80/list'

// Create new list
const createList = async (listData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(newList_URL, listData, config)

    return response.data
}

// Get user lists
const getLists = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+`${id}`, config)
    

    return response.data
}

// Delete user lists
const deleteList = async (listid,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(newList_URL+"/"+listid, config)

    return response.data
}



const listService = {
    createList,
    getLists,
    deleteList,
}

export default  listService
