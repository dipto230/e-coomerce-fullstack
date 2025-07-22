import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
      <header>
          {/*Topbar section is here*/}
          <Topbar />

          {/*Navbar section can be added here*/}
          <Navbar/>
    </header>
  )
}

export default Header