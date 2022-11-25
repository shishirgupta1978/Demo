import React, { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";




const Userlogin = () => {
  const navigate = useNavigate()
 

  let {user, loginUser, actionstatus } = useContext(AuthContext)




  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(e);
  }
  if(!user)
  {
  return (
    
    <div className="d-flex justify-content-center">

      <form id="login-form" onSubmit={handleSubmit}>
      <NavLink to="/products" className="btn-close float-end border border-dark" aria-label="Close"/>
      

        <h5 className="fw-bold fs-2 ">SignIn</h5>
        <hr className="mb-4" />
        <input type="email" id='email' name='email' className="form-control mb-1" placeholder="Email Address" required />
        <input type="password" id="password" name="password" className="form-control mb-2" placeholder="Password" required />


        <div className="row mb-3">
          <div className="col d-flex justify-content-center">
{/* 
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="agree" id="check" defaultChecked/>
              Remember me
            </div>*/}
          </div>

          <div className="col">
            <NavLink to='/auth/sendpasswordresetemail'>Forgot Password?</NavLink>

          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-secondary btn-block mb-4">Sign in</button>
        </div>
        <div className="text-center">
          <p className="mb-0">Not a member? <NavLink to='/auth/register'>Register</NavLink></p>
{/* 
          <p>or sign up with:</p>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>*/}
        </div>
     
        {actionstatus?.status ? (<div className="alert alert-info mt-3" role="alert"> {actionstatus.message}</div>) : ''}


      </form>
    </div>
  )}
  else{
    navigate("/products")
  }
}

export default Userlogin