import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "./AuthContext";

const SendPasswordResetEmail = () => {

  let {resetPasswordSendMail } = useContext(AuthContext)


  const handleSubmit = (e) => {

   
    resetPasswordSendMail(e)
    document.getElementById('password-reset-form').reset()

  }



  return (
    <>
      <div className="d-flex justify-content-center">

        <form style={{ backgroundColor: 'ButtonFace' }} className="w-25 p-2 border border-2" id="password-reset-form" onSubmit={handleSubmit}>
          <NavLink to="/auth/login" className="btn-close float-end border border-dark" aria-label="Close" />

          <h5 className="w-100 fw-bold fs-2 ">Password Reset</h5>
          <hr className="mb-4" />
          <input type="email" id='email' name='email' className="form-control mb-4" placeholder='Email Address' required />

          <div className=" row">
            <div className="col d-flex justify-content-center">
              <NavLink className="btn btn-danger btn-block mb-4" to="/auth/login">Cancel</NavLink>
            </div>
            <div className="col d-flex justify-content-center">
              <button type="submit" className="btn btn-secondary btn-block mb-4">Send</button>
            </div>
          </div>

        </form>
      </div>



    </>
  )

}

export default SendPasswordResetEmail