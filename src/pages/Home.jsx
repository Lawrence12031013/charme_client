import React, { useEffect, useContext } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Content from '../components/Content.jsx'
import './home.css'
import { TypeContextProvider } from '../context/TypeContext.js';


const Home = () => {
  
  return (
      <TypeContextProvider>
        <div>
            <Header />
            <div className='flex'>
              <div className='w-13'>
                <Sidebar />
              </div>
              <div className="w-87 p-4">
                <Content />
              </div>
            </div>
        </div>
      </TypeContextProvider>
  )
}

export default Home