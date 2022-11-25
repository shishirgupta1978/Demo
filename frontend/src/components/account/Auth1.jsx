import React from 'react'
import { Outlet,NavLink } from 'react-router-dom';

const Auth = () => {
  return (
    <>
 <div className='dashboard row'>
    <div className='col-3 sidebar'>
    <NavLink to="/products">Sign In</NavLink>
          <NavLink to="/contactus">Sign Up</NavLink>
          <NavLink to="/aboutus">Forget Password</NavLink>
          
        
    </div>
    <div className='col-9 bg-secondary' >
    <Outlet/>
 </div>
</div>    
    

    </>
  )
}

export default Auth