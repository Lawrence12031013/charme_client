import React, { useEffect, useState, useContext} from 'react'
import './content.css'
import { TypeContext } from '../context/TypeContext.js'
import Orders from '../subcomponents/Orders.jsx'
import Member from '../subcomponents/Member.jsx'
import Account from '../subcomponents/Account.jsx'
import AllOrder from '../subcomponents/AllOrder.jsx'

const Content = () => {
     // 直接從 MyContext 中獲取值
     const { typeData } = useContext(TypeContext);

    const typeContent = () => {
        if(typeData === 'order') {
            return <Orders />
        } else if (typeData === 'auth') {
            return <Member />
        }else if(typeData === 'account'){
            return <Account />
        }else {
            return <AllOrder />
        }
    }


  return (
    <div>
        { typeContent() }
    </div>
    
  )
}

export default Content