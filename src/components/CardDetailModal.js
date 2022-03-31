import {React,useEffect,useState} from 'react'
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { carddetailmodalclose } from '../stores/CardDetailModalStore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LabelIcon from '@mui/icons-material/Label';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import CommentIcon from '@mui/icons-material/Comment';
import Delete from '@mui/icons-material/Delete';
import {deleteCard} from '../stores/cardSlice'
import {updateCard, getCards, addComment, addDuedate} from '../stores/cardSlice'
import DescriptionIcon from '@mui/icons-material/Description';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';




function CardDetailModal() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 700,
        bgcolor: 'background.paper',
        
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
    };
    
    const openstatue = useSelector(state => state.carddetailopen)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const boardId = Number(window.location.href.split("/").reverse()[0])

    function handledeletebutton(item) {
        dispatch(deleteCard(item))
        dispatch(carddetailmodalclose())
    }


    const [changetitle, setChangeTitle] = useState();
    const handlecardtitleupdate = (e) => {
        setChangeTitle(e.target.value)
    }

    const cardData = {
        title:changetitle,
        cardId:openstatue.carditem.id,
        boardId:boardId,
    }
    

    useEffect(()=>{
        dispatch(getCards())
        setChangeTitle("")
    },[openstatue])

    
    
    

    const refcard = () => 
        dispatch(updateCard(cardData))


    const [comment, setComment] = useState();

    const handlecomment = (e) => {
        setComment(e.target.value)
    }

    const commentData = {
        cardId: openstatue.carditem.id,
        message:comment,
    }

    const addcommentfunc = () => {
        dispatch(addComment(commentData))
        dispatch(carddetailmodalclose())
    }
        
   
    const [date, setDate] = useState()

    const writedate = (e) => {
        setDate(e.target.value)
    }

    const duedateData = {
        "id": openstatue.carditem.id,
        "duedate": date,
    }

    const setduedate = () => {
        dispatch(addDuedate(duedateData))
        dispatch(carddetailmodalclose())

    }
        
    
    
        
        

    try {
    return (
        <Modal
            open={openstatue.open}
            onClose={() => dispatch(carddetailmodalclose())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} id="cardmodalstyle">
                <div id="modalfooter">
                    <input type="date" id="cardmodaliconsdate" name="birthday" onChange={writedate}></input>
                    <Button id="cardmodaliconsdate" sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<DoneIcon/>} onClick={setduedate} >Gün Ayarla</Button>

                </div>
                <hr></hr>
                <div id="modalfooter">
                    <LabelIcon id='cardmodalicons'/>
                    <AccountCircleIcon id='cardmodalicons'/>
                    <FactCheckIcon id='cardmodalicons'/>
                    <MoreHorizIcon id='cardmodalicons'/>
                </div>
                <hr></hr>
                <br></br>
                <div id="modalbody">
                    
                    <TextField id="cardmodaltitleupdate" label="Card Başlığını Güncelle" placeholder={openstatue.carditem.title} variant="filled" onChange={handlecardtitleupdate} value={changetitle}/>
                    <Button id="modalinsidebutton" sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<DoneIcon/>} onClick={() => refcard()}>Güncelle</Button>
                </div>
                <br></br>
                <Button variant="outlined" color="error" sx={{margin:1, marginTop:1,marginBottom:2, borderRadius:50}} onClick={() => handledeletebutton(openstatue.carditem.id)} endIcon={<Delete/>}>
                    CARDI SİL
                </Button>
                <br></br>
                <div id="commentsborder">
                    <div id="modalcomment">
                        <DescriptionIcon/>Açıklama
                    </div>
                    <div id="modalbody">
                        
                        <TextField id="cardmodaldescription" label="Açıklama"  variant="filled"/>
                        <Button id="modalinsidebutton" sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<DoneIcon/>}>Açıklama Ekle</Button>
                    </div>
                </div>
                
                <br></br>
                <div id="commentsborder">
                    <div id="modalcomment">
                        <CommentIcon/>Yorum Ekle
                    </div>
                    <div id="modalbody">
                        <TextField id="cardmodaldescription" label="Yorum"  variant="filled" onChange={handlecomment}/>
                        <Button id="modalinsidebutton" onClick={addcommentfunc} sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<DoneIcon/>}>Yorum Ekle</Button>
                    </div>
                </div>
                <br></br>
                <div id="commentsborder">
                    <div id="modalcomment">
                        <CommentIcon/>Yorumlar
                    </div>
                    <hr id="commenthr"></hr>
                    
                    { openstatue.open ? 
                        openstatue.carditem.comments ? 
                                openstatue.carditem.comments.map((item)=>{
                                    return ( 
                                    <>
                                    <div id="commentpiece">
                                        <Avatar id="userinfoavatar" alt={item.author.username} src="/static/images/avatar/3.jpg" />
                                        <p id="commentusername">{item.author.username}</p><br></br>
                                        <div id="commentbox">
                                            <p id="commentitem">{item.message}</p>
                                        </div>
                                    </div>
                                    </>
                                    )
                                })
                            : <></>
                    
                        

                        : <></>
                
                    }
                </div>



        
            </Box>
            

        </Modal>
    ) } catch  {
        
        dispatch(getCards())
        window.location.reload();
    }
}

export default CardDetailModal