import React, { useEffect, useState } from 'react'
import ListsHeader from './ListsHeader'
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {boxitemsmodalclose} from '../stores/boxitemsmodal';
import {boxitemsmodalopen} from '../stores/boxitemsmodal';
import axios from 'axios';


function Lists() {

  const boxesdata = window.location.href.split("/").reverse()[0]
  const data = useSelector(state => state.workfields)
  const boxitemmodal = useSelector(state => state.boxitemsmodal)
  const dispatch = useDispatch()
  let boxesindex;
  for (let i=0; i<data.yaziListesi.length; i++) {
    if (data.yaziListesi[i].id==boxesdata) {
        boxesindex=i;
    }
  }
  console.log(window.location.href.split("/").reverse()[0])

  const [boxmodalstate, setBoxModalState] = useState(false);
  
  const boxmodalstatechanger = () => {
    setBoxModalState(!boxmodalstate)
     
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: 750,
    bgcolor: 'background.paper',
    border: '2px ',
    boxShadow: 24,
    
    
  };
 const notto = () => {}

 


  return (
    <div>

      <ListsHeader/>
      <div className='addnewlist'>
        <div id="addnewlistbox">
          <span>Yeni Durum Listesi Oluştur</span>
          <hr/>
            <Button variant="contained" sx={{marginTop:1,marginBottom:2}} endIcon={<AddBoxIcon/>} >
              Ekle
            </Button>
        </div>
      </div>

      <div className='listscontainer'>
        {data.yaziListesi[boxesindex].statues.map((item)=>{
          
          return (
            <div key={item.statueid}>
              <Modal id="boxmodalbg" key={item.statueid+"c"}
                open={boxitemmodal.boxitemsmodal}
                onClose={() => dispatch(boxitemsmodalclose())}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{bgcolor:"rgba(231, 235, 240, 0.05)"}}
              >
                  <Box id="boxmodal" sx={style} onClick={notto}>
                    <div>
                      <div id="boxmodalup">

                      </div>
                      <div id="boxmodalbottom">
                        
                        <TextField fullWidth label="Başlık" id="fullWidth" value={boxitemmodal.boxitemscontent} /><br></br><br></br>
                        <TextField fullWidth
                          id="outlined-multiline-static"
                          label="Açıklama"
                          multiline
                          rows={4}
                          defaultValue=""
                        /><br></br>
                        <Button id="boxmodalbottomsave" sx={{margin:1.5}}variant="contained" endIcon={<AddBoxIcon/>} >Kaydet</Button>
                      </div>
                    </div>
                  </Box>
              </Modal>

              <div id="listbox" key={item.statueid+"l"} className={item.statueid}>
                <span>{item.statuename}</span>
                <hr/>
                {item.statueboxes.map((item2)=> {
                  return (
                    <div>
      
                      <div id="listitem" key={item2.boxid} data={item2.boxcontent} onClick={() => dispatch(boxitemsmodalopen(item2.boxcontent))}>
                        <div id="innertext" >
                          {item2.boxcontent}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <br></br>
                <textarea></textarea><br></br>
                <Button variant="contained" sx={{marginTop:1,marginBottom:2}} endIcon={<AddBoxIcon/>} >
                  Ekle
                </Button>

                
              </div>
            </div>
            
          )
        })}

      </div>


    </div>
  )
}

export default Lists