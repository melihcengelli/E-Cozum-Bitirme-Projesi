import axios from 'axios'


const API_URL = 'http://localhost:80/card'



// Create new card
const createCard = async (cardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, cardData, config)
    console.log("alttaki service createcard")
    console.log(cardData)

    return response.data
}

// Get cards
const getCards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`http://localhost:80/card`, config)
   
    

    return response.data
}

// delete cards
const deleteCard = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`http://localhost:80/card/${id}`, config)
   
    

    return response.data
}

// Update card
const updateCard = async (cardData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put('http://localhost:80/card/'+cardData.cardId,{"title":cardData.title,"boardId":cardData.boardId},config)
   
    

    return response.data
}

// Add comment
const addComment = async (commentData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('http://localhost:80/comment',{"cardId":commentData.cardId,"message":commentData.message},config)
   
    

    return response.data
}

// Add duedate
const addDuedate = async (duedateData,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`http://localhost:80/card/${duedateData.id}`,{"duedate":duedateData.duedate},config)
   
    return response.data
}





const cardService = {
    createCard,
    getCards,
    deleteCard,
    updateCard,
    addComment,
    addDuedate,
}

export default  cardService