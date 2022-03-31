
import {React, useContext, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { addlistmodalclose } from '../stores/addListModalStore';
import {addworkfield} from '../stores/workfields'
import { createBoard } from '../stores/addworkfieldSlice';
import { createList } from '../stores/listSlice'

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

function AddListModal() {
    const openstatue = useSelector(state => state.addlistopen)
    const dispatch = useDispatch();
    const addnewworkfield = useSelector(state => state.workfields)
    const boardId = Number(window.location.href.split("/").reverse()[0])

    const [addwf,setAddWf] = useState([]);
      const handleAddwfOnChange = (e) => {
            setAddWf(e.target.value)
      }

    const listData = {
        "title" : addwf,
        "boardId" : boardId,
    }
    const handleAddwfButton = () => (
             dispatch(createList(listData)),
             setAddWf(""),
             dispatch(addlistmodalclose())
             )

  return (
    <Modal
        open={openstatue.open}
        onClose={() => dispatch(addlistmodalclose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="addworkfieldboxstyle">
            <TextField id="modalinsidetext" label="Liste Başlığı"  variant="filled" value={addwf} onChange={handleAddwfOnChange}/>
            <Button id="modalinsidebutton" sx={{margin:1.5, borderRadius:50}}variant="contained" endIcon={<AddBoxIcon/>} onClick={handleAddwfButton}>Ekle</Button>
        </Box>
    </Modal>
  )
}

export default AddListModal