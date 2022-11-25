import React from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

import  {NavLink}  from "react-router-dom";

const ResetPassword = () => {

    let { uid,token} = useParams(); 
 
    let handleSubmit=(e)=>{
        e.preventDefault();
        const client = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
        client.post("/users/reset_password_confirm/", {'uid':uid,'token':token,'new_password':e.target.new_password.value,'re_new_password':e.target.re_new_password.value})
            .then((response) => {
                alert("Password Reset Successfully.")
//                window.open(`/insert/your/path/here/${variableName}`); 
            })
            .catch((error) => {
                alert(error.message + "\n" + JSON.stringify(error?.response?.data));
            });


    }

  return (
<>
<div className="d-flex justify-content-center">

<form style={{ backgroundColor: 'ButtonFace' }} className="h-50" id="reset-password-form" onSubmit={handleSubmit}>
<NavLink to="/products" className="btn-close float-end border border-dark" aria-label="Close"/>
  
  <h5 className="w-100 fw-bold fs-2 ">Reset Password</h5>
  <hr className="mb-4" />
  <input className="form-control mb-2" required id='new_password' name='new_password' placeholder='New Password' type='password'/>
  <input className="form-control mb-3" required id='re_new_password' name='re_new_password' placeholder='New Confirm Password' type='password'/>

   
    <div className="col d-flex justify-content-center">
      <button type="submit" className="btn btn-secondary btn-block mb-4">Send</button>
    </div>
  
</form>
</div>








  
</>
  )
   
}

export default ResetPassword