import { useEffect } from "react"
import { useParams } from "react-router-dom"
import React from 'react';
import axios from "axios";

const ActivationSuccess = () => {
    let { uid,token} = useParams(); 
    useEffect(() => {
        const client = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
        client.post("/users/activation/", {'uid':uid,'token':token})
            .then((response) => {
                alert("User activated.")
            })
            .catch((error) => {
                alert(error.message + "\n" + JSON.stringify(error?.response?.data));
            });

       
    },[uid,token]);

  return (
    <div></div>
  )
}

export default ActivationSuccess