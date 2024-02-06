import React, { useContext } from 'react'
import './header.css'
import { LoginContext } from '../context/LoginContext'
import { logout } from '../constants/actionTypes'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(LoginContext)
    const handleClick = (e) => {
        dispatch({type:logout})
        navigate('/')
    }

  return (
    <>
        <div className='header flex justify-end items-center'>
            <div className='px-4'>
                <p>歡迎您，{ user.name }</p>
            </div>
            <div className='px-6'>
                <button onClick={handleClick}>登出</button>
            </div>
        </div>
    
    </>
  )
}

export default Header