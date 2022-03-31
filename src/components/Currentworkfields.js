
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Delete from '@mui/icons-material/Delete';
import {removeworkfield, refreshdata} from '../stores/workfields'
import {currentworkfieldid} from '../stores/boardinfo'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getBoards, reset, deleteBoard} from '../stores/addworkfieldSlice'
import Spinner from './Spinner'
import Alert from '@mui/material/Alert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { modalopen } from '../stores/modal'
import { borderRadius } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import {titleupdateopen} from '../stores/titleUpdateModalStore'



function Currentworkfields() {
    const [verideneme,setVeriDeneme] = useState([]);
    const data = useSelector(state => state.workfields)
    const openstatue = useSelector(state => state.titleupdate)
    const {user} = useSelector((state)=> state.auth)
    const {board, isLoading, isError, message} = useSelector((state) => state.board)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isError){
            console.log(message);
        }
        if(!user) {
            navigate('/login')
        }
        if(isLoading){
            return <Spinner/>
        }
        dispatch(getBoards())
        return () => {
            dispatch(reset())
        }
    },[user,navigate, isError, message, dispatch])

    const [titleupdate, setTitleUpdate] = useState(false);


    const url= 'http://localhost:80/board'

    const config = {
        headers: { Authorization: `Bearer ${user ? user.token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZWxpaCIsImlhdCI6MTY0Nzk5NTYzNiwiZXhwIjoxNjQ4MDAyODM2fQ.f7dWHWyvTHz5GP9dRoGO8epRn53E2gn8jpWABRfnuM4"}` },
    };

    const routelists = (item) => navigate(`/list/${item}`)


  return (
    <div id="testdiv" className="boxes">

        

                        
         

            {board.map((item)=> {

            const newurl = `/list/${item.id}`
            return (
                <div key={item.id} className="boxopa"  id={item.id}> 
                
                    <Box
                        id="workfielditems"
                        sx={{
                        float:'left',
                        margin:4,
                        borderRadius: 16,
                        width: 300,
                        height: 300,
                        backgroundColor: 'primary.dark',
                        overflow: 'hidden',
                        justifyContent: 'space-around',
                        
                        
                        }} 
                        key={item.id}
                    > 


                        <div id="addworkfielditemstitle">
                            
                            <div id="addworkfielditemstitle" onClick={() => dispatch(titleupdateopen(item))}>
                                <p id="addworkfielditemstitleitem">
                                    {item.title.length>20 ? `${(item.title.split("").splice(0,20)).join("")}...` : item.title} 
                                </p>
                                <Visibility sx={{fontSize:15}}/>
                            </div>
                            
                        </div>
                        <hr></hr><br/>
                        <p id="addworkfielditems">{item.id}</p>
                        <p id="addworkfielditems">{item.createdAt.split("T")[0]}</p>
                        <Link to={newurl} id="toworkfieldbutton">
                            <Button  id={item.id} variant="contained" sx={{margin:1, borderRadius:3}} endIcon={<ArrowUpward/>} onClick={() => routelists(item.id)}>
                            Çalışma Alanına Git
                            </Button>
                        </Link>
                        <Button  id={item.id} onClick={() => dispatch(deleteBoard(item.id))} variant="outlined" color="error" sx={{margin:1, borderRadius:50}}  >
                            <Delete/>
                        </Button>
                    


                    
                    </Box>
                
                </div>

            )
            
            })}
            <div  className="boxopa2"  > 
                <Box
                id="workfielditems"
                sx={{
                    float:'left',
                    margin:4,
                    borderRadius: 16,
                    width: 300,
                    height: 300,
                    backgroundColor: 'primary.dark',
                    overflow: 'hidden',
                    justifyContent: 'space-around',
                
                
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

export default Currentworkfields