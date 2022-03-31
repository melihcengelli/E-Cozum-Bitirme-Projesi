import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import {logout, reset} from '../stores/authSlice'
import{Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  return (
    <div className='header'>
        <div id="leftheader">
          <div id="coveravatar">
            <div id="userinfos">
              <Stack direction="row" spacing={2}>
                  <Avatar id="userinfoavatar" alt={user ? user.username.toUpperCase() : "null"} src="/static/images/avatar/3.jpg" />
              </Stack>
            </div>
          </div>
          <p id="usernameinfo">{user ? user.username : "null"}</p>

        </div>
        
        <div id="midheader">   
        </div>
        <div id="rightheader">
          <div id="logoutbutton">
            {user ? (
                <Button variant="outlined"  onClick={onLogout}><LogoutIcon/>Çıkış</Button>
              ) : (<>
                <p>Giriş yapılmadı.</p>
              </>) }
          </div>

        </div>

    </div>
  )
}

export default Header