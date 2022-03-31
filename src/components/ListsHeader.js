import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import CheckCircle from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector , useDispatch} from 'react-redux';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getBoards} from '../stores/addworkfieldSlice'


function ListsHeader() {

  const {user} = useSelector((state) => state.auth)

const [boardnamecontrol, setBoardNameControl] = useState(false);

const boardId = Number(window.location.href.split("/").reverse()[0])
const {board} = useSelector((state) => state.board)
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getBoards())
  setBoardNameUp(board.length)
  
},[])
const [boardnameup, setBoardNameUp] = useState(board.length);
const navigate = useNavigate()




const handleChangeBoardNameControl = (e) => {
  setBoardNameUp(e.target.value)
}

const handleChangeBoardName = (e) => {
  setBoardNameControl(!boardnamecontrol)
  

}


const turnback = () => navigate(`/`)





  return (
    <div className='header'>
        <div id="leftheader">
          <div id="userinfos">
            <Stack direction="row" spacing={2}>
                <Avatar id="userinfoavatar" alt={user ? user.username.toUpperCase() : "null"} src="/static/images/avatar/3.jpg" />
            </Stack>
          </div>
          <p id="usernameinfo">{user ? user.username : "null"}</p>

        </div>
        
        <div id="midheader">
          <p id="boardname"></p>
            
        </div>


        <div id="rightheader">
          <div id="turnbacktowf" onClick={turnback}>
            <ArrowBackIosNewIcon/>
            <p id="turnbacktowfins"> Çalışma Alanlarına Geri Dön</p>
          </div>

          
        </div>

    </div>
  )
}

export default ListsHeader