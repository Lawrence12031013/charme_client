import React, { useEffect, useState } from 'react'
import './sidebar.css'

const Sidebar = () => {

    const [type, setType] = useState(0)
    const [ state, setState ] = useState('order')

    const handleActiveButton = (e) => {
        setType(e.num)
        setState(e.name);
    }

  return (
    <>
        <div className='sidebar'>
            <ul className='text-center'>
                <li className='p-2'><button name='order' className={ state === 'order' ? 'active' : '' } onClick={ () => handleActiveButton({name:'order', num:0}) }>預約查詢</button></li>
                <li className='p-2'><button name='auth' className={ state === 'auth' ? 'active' : '' } onClick={ () => handleActiveButton({name:'auth', num:1}) }>會員管理</button></li>
                <li className='p-2'><button name='account' className={ state === 'account' ? 'active' : '' } onClick={ () => handleActiveButton({name:'account', num:2}) }>帳務管理</button></li>
            </ul>
        </div>
    </>
  )
}

export default Sidebar