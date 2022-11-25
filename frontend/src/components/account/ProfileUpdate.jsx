import React, {useEffect,useState, useRef} from 'react'

import { NavLink } from 'react-router-dom';
import axios from 'axios';

import '../../log.png';
import '../../noprofile.png';

const ProfileUpdate = () => {

    const [data, setData] = useState({})
    const [file, setFile] = useState({})
    const ref = useRef();
    const client = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

    let reqInstance = client.create({
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` },
        }
      );

  let getApidata= ()=>{
     
  reqInstance.get('/users/me').then((response) => {
        setData(response?.data?.profile);
        setFile(response?.data?.profile?.pic)
  console.log(response.data);
    }).catch((error) => {return null });

  }


    let handleInputChange = (e) => {
        setData((prevState) => ({ ...prevState, [e.target.getAttribute("id")]: (e.target.value || e.target.value === '') ? e.target.value : URL.createObjectURL(e.target.files[0]) }));
    }


    let handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstname', e.target.firstname.value);
        formData.append('lastname', e.target.lastname.value);
        
        if (e.target.pic?.value) {

            formData.append('pic', e.target.pic.files[0], e.target.pic.files[0].name);
        }
        if (e.target.document.value) {

            formData.append('document', e.target.document.files[0], e.target.document.files[0].name);
        }

        
        reqInstance.patch("http://127.0.0.1:8000/api/profile/", formData).then(() => {
                setData({});
                
                e.target.firstname.value = '';
                e.target.lastname.value = '';
                
                getApidata();


            }).catch((error) => { alert(error.message) })



    }

    useEffect(()=>{
        getApidata();
      
      },[])
      
    return (
        <div className='container-fluid p-3 d-flex justify-content-center'>
            
                <form onSubmit={handleSubmit} className="mx-3">
                    <NavLink to="/products" className="btn-close float-end border border-dark" aria-label="Close" />


                    <h6 className="w-100 fw-bold fs-4 ">Update Profile</h6>
                    <hr className="mb-4" />
                    <div className='d-flex justify-content-center'>

                        <label htmlFor="pic"><img className="avatar" style={{ width: '100px', height: '100px' }} alt="ProfilePic" src={file ? file : require('../../noprofile.png')} /></label>
                    </div> <input style={{ visibility: 'hidden' }} type="file" accept="image/png, image/jpeg" id="pic" onChange={(e)=>{setFile(URL.createObjectURL(e.target.files[0]))}} name="pic" />


                    {data.id ? <input className='form-control mb-3' type="hidden" id="id" name="id" placeholder='id' value={data.id} disabled /> : ""}

                    <input className='form-control mb-3' type="text" id="firstname" name="firstname" placeholder='Firstname' onChange={(e) => { handleInputChange(e) }} value={data.firstname ? data.firstname : ""} />
                    <input className='form-control mb-3' type="text" id="lastname" name="lastname" placeholder='Lastname' onChange={(e) => { handleInputChange(e) }} value={data.lastname ? data.lastname : ""} />
                    
                    <input type="file" className='form-control mb-3' id="document" ref={ref} name="document"  />

                    <div className='d-flex justify-content-center'><input type="submit" value="Update" /></div>

                </form></div>
         
            
    )
}

export default ProfileUpdate