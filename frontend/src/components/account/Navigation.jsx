import React from 'react'
import { NavLink } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import { useContext } from 'react';
import AuthContext from './AuthContext';




const Navigation = () => {
  let {user, logoutUser}= useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <header className="container-fluid">
    
      <div className="d-flex flex-wrap align-items-center justify-content-lg-start">
        
        <span style={{color:'brown', fontSize:"25px"}}><strong>HELPDESK</strong></span>
        

        
        { user ? (<ul style={{marginLeft:'340px'}} className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"><li><NavLink to="/auth/helpdesk">Tickets</NavLink></li>
          <li><NavLink to="/auth/resolution">Resolution</NavLink></li></ul>):(<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>)}

       {
       
       
       
       /*  <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/contactus">Contact Us</NavLink></li>
          <li><NavLink to="/aboutus">About Us</NavLink></li>
          <li><NavLink to="/crud">Crud</NavLink></li>
          <li><NavLink to="/cart">Cart 0
            </NavLink></li>*/}
        
{/*
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
        </form>
  */}
        { user ? (<ProfileNavigation/>):<NavLink to="/auth/login">Login</NavLink>}
    </div>
  </header>


  )
}

export default Navigation