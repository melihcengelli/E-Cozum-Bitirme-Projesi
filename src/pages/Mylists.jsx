import ListsHeader from "../components/ListsHeader"
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {deleteList,getLists, reset} from '../stores/listSlice'
import {getCards} from '../stores/cardSlice'
import { addlistmodalopen } from '../stores/addListModalStore'
import AddListModal from "../components/AddListModal";
import Delete from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TextField from '@mui/material/TextField';
import {createCard} from '../stores/cardSlice'
import CardDetailModal from "../components/CardDetailModal";
import {carddetailmodalopen} from '../stores/CardDetailModalStore'
import AccessTimeIcon from '@mui/icons-material/AccessTime';



function Mylists() {
    
    const {list, isLoading, isError, message} = useSelector((state) => state.list)
    const {card} = useSelector((state) => state.card)
    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const boardId = Number(window.location.href.split("/").reverse()[0])
    const [addopen, setAddOpen] = useState(false);

    const [formcontrol, setFormControl] = useState()

    const handleformaction = () => {
        setAddOpen(!addopen)

    }

    const handleonchange = (e) => {
        setFormControl(e.target.value)
        console.log(e.target.value)
    }

    


    useEffect(()=>{
        if(isError){
            console.log(message);
        }
        if(!user) {
            navigate('/login')
        }
        
        dispatch(getLists(boardId))
        
        
        
        
        return () => {
            dispatch(reset())
        }
    },[user,navigate, isError, message, dispatch])

    useEffect(()=> {
        dispatch(getCards())
    },[dispatch])

   

  


  return (
    <>
        <ListsHeader/>
        <AddListModal/>
        <CardDetailModal/>
        <div className='addnewlist'>
            <div id="addnewlistbox">
                <br></br>
            <span>Yeni Durum Listesi Oluştur</span><br></br>
            
                <Button id="bluebuttons" variant="outlined" onClick={() => dispatch(addlistmodalopen())} sx={{marginTop:1,marginBottom:2}} endIcon={<AddBoxIcon/>} >
                Ekle
                </Button>
                
            </div>
        </div>
        <div className='listscontainer'>
            
            {
            
            list.map((item)=>{
            
            return (
                <div key={item.id} id="listboxcover">
                    <div id="listbox" key={item.id} >
                        <span key={item.id}>{item.title}</span>
                        <hr></hr>

                        {
                            card.map((carditem)=> {
                                return (
                                    
                                        (carditem.listId==item.id ? 
                                        <div id="listitem" key={carditem.id} onClick={() => dispatch(carddetailmodalopen(carditem))}>
                                            <div id="innertext" key={item.id+"innertext1"}>
                                                {carditem.title}
                                            </div>
                                            { carditem.duedate==null ? <></>
                                                
                                                : 
                                                <div id="innertext" key={item.id+"innertext2"}>
                                                    {carditem.duedate!==null ? <div id="innertextduedate" key={item.id+"innertextduedate"}><AccessTimeIcon/><p id="duedatetext" key={item.id+"duedatetext"}>{carditem.duedate}</p></div> : <></>}
                                                </div>
                                            }
                                        </div>
                                    :
                                    <></>)
                                    
                                    
        
                                )
                            })
                        }
                    </div>
                    <div id="listboxunder" >
                        {addopen ? <div>
                            <hr></hr>
                            <br></br>
                            <TextField
                                error
                                id="cardbasligi"
                                label="Card Başlığı"
                                onChange={handleonchange}
                            />
                            <br></br>
                            <Button variant="outlined" onClick={() => dispatch(createCard({"title":formcontrol,"listId":item.id}))} sx={{marginTop:1,marginBottom:2, borderRadius:50}} endIcon={<AddBoxIcon/>} >
                                Ekle
                            </Button>

                            <hr></hr>

                            <Button variant="outlined"  sx={{margin:1, marginTop:1,marginBottom:2, borderRadius:50}} onClick={handleformaction} >
                                <ArrowUpwardIcon/>
                            </Button>
                            <Button variant="outlined" color="error" sx={{margin:1, marginTop:1,marginBottom:2, borderRadius:50}} onClick={() => dispatch(deleteList(item.id))} >
                                <Delete/>
                            </Button>



                            
                        </div> :
                        <div id="listboxunderdelete">
                        
                        <Button variant="outlined"  sx={{margin:1, marginTop:1,marginBottom:2, borderRadius:50}} onClick={() => setAddOpen(!addopen)}> 
                            <AddIcon/> 
                        </Button>
                        <Button variant="outlined" color="error" sx={{margin:1, marginTop:1,marginBottom:2, borderRadius:50}} onClick={() =>  dispatch(deleteList(item.id))} >
                            <Delete/>
                        </Button>
                        
                        </div>
                        
                        }
                    </div>
                </div>
            )
            })
            
            }

        </div>

    </>
  )
}

export default Mylists