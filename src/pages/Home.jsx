import React from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import './home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='flex'>
        <div className='w-10'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Home