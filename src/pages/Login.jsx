import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css';
import { useState } from 'react';
import {BrowserRouter as Route, Link } from 'react-router-dom'
import { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from  '../stores/authSlice'
import Spinner from '../components/Spinner'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user,isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)


    const [formData, setFormData] = useState ({
        username:"",
        password:"",
        
    })

    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
            
        }

        dispatch(reset())
    },[user,isError, isSuccess,message,navigate, dispatch])
    
    const {username, password, passwordConfirm} = formData

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            username,
            password
        }
        dispatch(login(userData))
    }

    


  return (
    <div className='loginformcontainer'>
        <div className='formborder'>
            <section>
                <form id="form" onSubmit={onSubmit}>
                    <h1>GİRİŞ YAP</h1>
                    <p>Hoşgeldiniz</p><br></br>
                        {isLoading ? <Spinner/>: <></>}
                    <TextField value={username} onChange={onChange} name="username" className="loginform" id="username" label="Kullanıcı Adı" variant="outlined" /><br></br>
                    <TextField value={password} onChange={onChange} name="password" className="loginform" id="password" type="password" label="Şifre" variant="outlined" /><br></br>
                    <Button variant="contained" type="submit" >Giriş Yap</Button><br></br>
                    <p >Hala üye değil misin? Hemen<Link to="/register" id="uyeollink"> Üye Ol </Link></p>
                </form>
            </section>
        </div>
    </div>
  )
}

export default Login

