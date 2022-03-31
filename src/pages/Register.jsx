import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {BrowserRouter as Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from  '../stores/authSlice'
import Spinner from '../components/Spinner'



function Register() {

    const [formData, setFormData] = useState ({
        username:"",
        password:"",
        passwordConfirm:"",
    })
    
    const {username, password, passwordConfirm} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user,isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)


    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
            
        }

        dispatch(reset())
    },[user,isError, isSuccess,message,navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if(password!==passwordConfirm) {
            toast.error('Password do not match')
        } else {
            const userData = {
                username,
                password,
                passwordConfirm,
                
            }

            dispatch(register(userData))
        }
    }
     
   

  return (
        <div className='loginformcontainer'>
        <div className='formborder'>
            <section className='form'>
                <form id="form" onSubmit={onSubmit}>
                    <h1>ÜYE OL</h1>
                    <p>Hoşgeldiniz</p><br></br>
                        {isLoading ? <Spinner/>: <></>}
                    <TextField value={username} onChange={onChange} sx={{color:'white'}} className="loginform" id="username" name="username" label="Kullanıcı Adı" variant="outlined" placeholder='Kullanıcı adınızı giriniz.'/><br></br>
                    <TextField value={password} onChange={onChange} className="loginform" id="password" name="password" type="password" label="Şifre" variant="outlined" placeholder='Şifrenizi giriniz.' /><br></br>
                    <TextField value={passwordConfirm} onChange={onChange} className="loginform" id="passwordConfirm" name="passwordConfirm" type="password" label="Şifre Doğrulama" variant="outlined" placeholder='Şifrenizi tekrar giriniz.' /><br></br>
                    <Button variant="contained" type="submit" >Üye Ol</Button><br></br>
                    <p>Zaten üye misin? Hemen<Link to="/login" id="uyeollink"> Giriş Yap</Link></p>
                </form>
            </section>
        </div>
    </div>

  )
}

export default Register

