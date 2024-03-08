import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Content from '../components/Content.jsx'
import './home.css'
import { TypeContextProvider } from '../context/TypeContext.js';


const Home = () => {

  const [hideButton, setHideButton] = useState(false)

  return (
      <TypeContextProvider>
        <div>
          <Header />
          { window.innerWidth < 490 && !hideButton ?
            <div>
              <button className='hideButton' onClick={() => setHideButton(true)}></button>
              <div>
                <div className="p-4">
                  <Content />
                </div>
              </div>
            </div> 
            :
            <div>
              <button className='showButton' onClick={() => setHideButton(false)}>
                <div className='buttonBcg'></div>
              </button>
              <div className='flex'>
                <div className='w-13 z-10'>
                  <Sidebar />
                </div>
                  <div className='background'></div>
                <div className="w-87 p-4 overflow-hidden bcgHeight">
                  <Content />
                </div>
              </div>
            </div>
        }
            
        </div>
      </TypeContextProvider>
  )
}

export default Home