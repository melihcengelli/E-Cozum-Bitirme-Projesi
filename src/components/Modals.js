import {React, useContext, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import { modalclose } from '../stores/modal'
import {addworkfield} from '../stores/workfields'
import { createBoard } from '../stores/addworkfieldSlice';

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
  function Modals() {
      const openstatue = useSelector(state => state.open)
      const addnewworkfield = useSelector(state => state.workfields)
      const dispatch = useDispatch();
      

      const [addwf,setAddWf] = useState([]);
      const handleAddwfOnChange = (e) => {
            setAddWf(e.target.value)
      }
      const handleAddwfButton = () => (
             dispatch(createBoard(addwf)),
             setAddWf(""),
             dispatch(modalclose())
             )
      
      

  return (
    <Modal
        open={openstatue.open}
        onClose={() => dispatch(modalclose())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="addworkfieldboxstyle">
            <TextField id="modalinsidetext" label="Çalışma Alanı Başlığı" variant="filled" value={addwf} onChange={handleAddwfOnChange}/>
            <Button id="modalinsidebutton" sx={{margin:1.5}}variant="contained" endIcon={<AddBoxIcon/>} onClick={handleAddwfButton}>Ekle</Button>
        </Box>
    </Modal>
  )
}

export default Modals