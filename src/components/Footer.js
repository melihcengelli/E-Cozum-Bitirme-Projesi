import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



function Footer() {
  return (
    <div className='footer'>
        <Stack direction="row" spacing={2}>
          <span id="userinfo">
            <Avatar id="userinfoavatar" alt="Melih" src="/static/images/avatar/3.jpg" />
            
          </span>
        </Stack>
        <Typography id="userinfoavatar2" variant="subtitle1" gutterBottom component="div">
              Melih
        </Typography>

    </div>
  )
}

export default Footer