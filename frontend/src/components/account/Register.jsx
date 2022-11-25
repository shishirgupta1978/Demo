import React,{useContext } from "react";

import  {NavLink}  from "react-router-dom";
import AuthContext from "./AuthContext";


const Register = () => {
    let { actionstatus,registerUser } = useContext(AuthContext)
    
    
    const handleSubmit=(e)=>{
  
    e.preventDefault();
   
      registerUser(e)
      document.getElementById("registeration-form").reset()
 
}

  return (
    <>
     <div className="d-flex justify-content-center">
      
      <form style={{backgroundColor: 'ButtonFace'}} className="w-25 p-2 border border-2" id="registeration-form" onSubmit={handleSubmit}>
      <NavLink to="/auth/login" className="btn-close float-end border border-dark" aria-label="Close"/>
      <h5 className="w-100 fw-bold fs-2 ">Register</h5>
      <hr className="mb-4"/>
      <input type="email" id='email' name='email' placeholder="Email Address" className="form-control mb-1" required />
      <input type="text" id='username' name='username' placeholder="Username" className="form-control mb-1" required />
      <input type="date" id="date_of_birth" name="date_of_birth" className="form-control mb-1" required />
      <input type="password" id="password" name="password" placeholder="Password" className="form-control mb-1" required/>
      <input type="password" id="re_password" placeholder="Confirm Password" name="re_password" className="form-control mb-2" required/>
          
        
        
          
            
            <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" value="agree" name="tnc" id="tnc" required/>I agree to <NavLink to='/auth/tnc'>term and conditions.</NavLink>
          
            </div>
          
            <div className=" row">
          <div className="col d-flex justify-content-center">
          <NavLink className="btn btn-danger btn-block mb-4" to="/auth/login">Cancel</NavLink>
          </div>
          <div className="col d-flex justify-content-center">
          <button type="submit" className="btn btn-secondary btn-block mb-4">Register</button>
          </div>
        </div>
        {actionstatus?.status ? (<div className="alert alert-info mt-3" role="alert"> {actionstatus.message}</div>) : ''}
      </form>
      </div>
      
</>
  )
}

export default Register