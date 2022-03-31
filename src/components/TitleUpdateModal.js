import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {titleupdateclose} from '../stores/titleUpdateModalStore'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {updateBoard} from '../stores/addworkfieldSlice'
import {getBoards, reset, deleteBoard} from '../stores/addworkfieldSlice'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };
function TitleUpdateModal() {
    const openstatue = useSelector(state => state.titleupdate)
    const dispatch = useDispatch();


    const [titlevalue, setTitleValue] = useState();
    const handlechangetitle = (e) => {
        
        setTitleValue(e.target.value)
        console.log(titlevalue)

    }

    let title = String(titlevalue)
    let id = Number(openstatue.item.id)

    const boardData = {
        title:title,
        id:id,
    }

    const nowdispatches = () => 
        dispatch(updateBoard(boardData))
        dispatch(getBoards())
        
    
        
        
    

    
    
    
  return (
    <Modal
        open={openstatue.open}
        onClose={() => dispatch(titleupdateclose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="addworkfieldboxstyle">
            <TextField id="modalinsidetext" label={openstatue.item.title}  variant="filled" value={titlevalue} onChange={handlechangetitle} />
            <Button id="modalinsidebutton" sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<ChangeCircleIcon/>} onClick={()=> nowdispatches()}>Güncelle</Button>
        </Box>
    </Modal>
  )
}

export default TitleUpdateModal