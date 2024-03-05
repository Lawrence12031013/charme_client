import React, { useEffect, useState, createContext, useContext } from 'react'
import './sidebar.css'
import { useMyContext } from '../context/TypeContext';

const Sidebar = () => {

    const [type, setType] = useState(0)
    const [ state, setState ] = useState('order')

    

    const handleActiveButton = (e) => {
        setType(e.num)
        setState(e.name);
        const dataToSend = e.name;
        onDataUpdate(dataToSend);
    }

    const { onDataUpdate } = useMyContext();


  return (
    <>
        <div className='sidebar'>
            <ul className='text-center'>
                <li className='p-2'><button name='order' className={ state === 'order' ? 'active' : '' } onClick={ () => handleActiveButton({name:'order', num:0}) }>預約查詢</button></li>
                <li className='p-2'><button name='account' className={ state === 'allOrder' ? 'active' : '' } onClick={ () => handleActiveButton({name:'allOrder', num:3}) }>全部訂單</button></li>
                <li className='p-2'><button name='auth' className={ state === 'auth' ? 'active' : '' } onClick={ () => handleActiveButton({name:'auth', num:1}) }>會員管理</button></li>
                <li className='p-2'><button name='account' className={ state === 'account' ? 'active' : '' } onClick={ () => handleActiveButton({name:'account', num:2}) }>帳務管理</button></li>
            </ul>
        </div>
    </>
  )
}

export default Sidebar