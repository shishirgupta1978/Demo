import React from 'react'

import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Base = () => {
  return (
    <>

      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>

  )
}

export default Base