import React, { useContext, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { login_success, start_login } from '../constants/actionTypes'
import axios from 'axios'
import { LoginContext } from '../context/LoginContext'

const Login = () => {
    const navigate = useNavigate()
    const {loading, error, dispatch, login, logout} = useContext(LoginContext)
    const [ loginData, setLoginData ] = useState({
        account:undefined,
        password:undefined
    })


    const handelChange = (e) => {
        setLoginData( prev => ({...prev, [e.target.id] : e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:start_login})
        try {
            const res = await axios.post('auth/login', loginData)
            dispatch({type:login_success, payload:res.data.userDetails})
            
        }catch(error) {
            console.log(error)
            alert(2)
        }
        // navigate('/home')
    }
    
    
  return (
    <div className='login relative'>
            <div className='flex justify-center flex-col items-center absolute inset-x-1/2 top-56'>
                <img className='logo my-8' src="/images/logo.png" alt="logo" />
                <div className='flex flex-col'>
                    <input className='border border-slate-800 rounded' type="text" id='account' placeholder='帳號' onChange={handelChange}/>
                    <input className='border border-slate-800 rounded mt-2' type="password" id='password' placeholder='密碼' onChange={handelChange}/>
                </div>
                <button className='loginButton mt-5 rounded' onClick={handleClick}>登入</button>
            </div>
    </div>
  )
}

export default Login 