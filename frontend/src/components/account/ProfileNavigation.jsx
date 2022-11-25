import React, {useContext,useEffect} from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from "./AuthContext";
import axios from 'axios';

const ProfileNavigation = () => {
  const [data,setData]=useState({})
  let { logoutUser } = useContext(AuthContext)
  const client = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });


  let myfun= ()=>{
    let reqInstance = client.create({
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` },
        }
      );
     
  reqInstance.get('/users/me').then((response) => {
        setData(response.data);
  console.log(response.data);
    }).catch((error) => {return null });

  }

useEffect(()=>{
  myfun();

},[])

  return (
    <div className="dropdown text-end">
    <a href="/auth/profile" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">

    {data?.username}  <img src={data?.profile?.pic} alt="mdo" width="32" height="32" className="rounded-circle"/>
    </a>
    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
      <li><NavLink to="/auth/changepassword" className="dropdown-item">Change Password</NavLink></li>
      <li><a className="dropdown-item" href="/auth/profile">Profile</a></li>
      <li><hr className="dropdown-divider"/></li>
      <li onClick={logoutUser} className="dropdown-item mx-3">Sign out</li>
    </ul>
  </div>
  )
}

export default ProfileNavigation