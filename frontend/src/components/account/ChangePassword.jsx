import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom';

const ChangePassword = () => {
    const [error,setError] = useState({
        status:false,
        msg:"",
        type:""
    })

    const handelChange = e =>{
        setError({...error,[e.target.name]:e.target.value});

    };


    const handleSubmit=(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData={
        password:data.get('password'),
        confirmpassword:data.get('confirmpassword')
    }
    if(actualData.password && actualData.password===actualData.confirmpassword){
        document.getElementById('password-change-form').reset()
        setError({status:true, msg:"Password changed successfully.", type:'success'})
    }else{
        setError({status:true, msg:"Please enter valid password.", type:'error'})

    }

}

  return (
    <>

<div className="d-flex justify-content-center">
      
      <form onChange={handelChange} style={{backgroundColor: 'ButtonFace'}} className="w-25 p-2 border border-2" id="password-reset-form" onSubmit={handleSubmit}>
      <NavLink to="/products" className="btn-close float-end border border-dark" aria-label="Close"/>
      
      <h5 className="w-100 fw-bold fs-2 ">Change Password</h5>
      <hr className="mb-4"/>
      
<input required id='password' name='password' className="form-control mb-1" placeholder='New Password' type='password'/>
<input required id='confirmpassword' name='confirmpassword' className="form-control mb-4" placeholder='New Confirm Password' type='password'/>
      
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-secondary btn-block mb-4">Update</button>
        </div>
        {error.status ? <p>{error.type}:{error.msg}</p> : ''}
      </form>
      </div>



</>

  )
}

export default ChangePassword