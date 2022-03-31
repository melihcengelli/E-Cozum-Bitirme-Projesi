import React from 'react'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { modalopen } from '../stores/modal'


function Addworkfield() {
  const dispatch = useDispatch()

  return (
    
      <div key="Addworkfield">

<div id="addbox">
          
          <Box
            id="addworkfieldbox"
            sx={{
              display: 'flexbox',
              borderRadius: 16,
              width: 300,
              height: 300,
              backgroundColor: 'primary.dark',
              textAlign: 'center',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              
              
            }}
          > 
            <p id="addworkfieldp">Çalışmalarınızı takip etmek için çalışma alanı ekleyebilirsiniz.</p>
            <Button variant="contained" sx={{margin:1}} endIcon={<AddBoxIcon/>} onClick={() => dispatch(modalopen())}>
              Çalışma Alanı Ekle
            </Button>
            
          </Box>
          
        </div>
        

      </div>
      
    
  )
}

export default Addworkfield