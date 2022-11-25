import React, { createContext, useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const client = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });

export default AuthContext;
export const AuthProvider = ({ children }) => {
    
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null);
    let [actionstatus, setActionstatus] = useState({ status: null, message: null });
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()

        client.post('jwt/create/', { email: e.target.email.value, password: e.target.password.value })
            .then((response) => {

                let data = response.data
                setAuthToken(data)
                setUser(jwt_decode(data.access));
                
                localStorage.setItem('authTokens', JSON.stringify(data))
 
                navigate('/auth/helpdesk')

            })
            .catch((error) => {
                alert(error.message + "\n" + JSON.stringify(error?.response?.data));
            });


    }

    let resetPasswordSendMail = async (e) => {
        e.preventDefault()

        client.post('users/reset_password/', { email: e.target.email.value })
            .then((response) => {
                console.log(response)

                alert("Mail Send, Check your email.");

            })
            .catch((error) => {
                alert(error.message + "\n" + JSON.stringify(error?.response?.data));
            });


    }

    let registerUser = async (e) => {
        e.preventDefault()

        client.post('users/', { email: e.target.email.value.toLowerCase(),username: e.target.username.value.toLowerCase(),date_of_birth: e.target.date_of_birth.value ,password: e.target.password.value, re_password: e.target.re_password.value })
            .then(() => {

                alert("User Registered, please check activation mail.")
            })
            .catch((error) => {
                
                alert(error.message + "\n" + JSON.stringify(error?.response?.data));
            });


    }



    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        
        setActionstatus({ status: null, message: null })
        localStorage.removeItem('authTokens')
        alert("Logout Successfully.");
        navigate('/auth/login')

    }

    let updateToken = useCallback(() => {
        if (authToken) {
            client.post('jwt/refresh/', { refresh: (authToken ? authToken?.refresh : null) })
                .then((response) => {
                    let data = response.data
                    setAuthToken({ ...authToken, access: data.access })
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(authToken))
                })
                .catch((error) => {
                    console.log(error.message);

                    logoutUser();
                })
        }

        if (loading) {
            setLoading(false);
        }

    }, [client, authToken, loading]
    )





    let contextData = { resetPasswordSendMail:resetPasswordSendMail,user: user, registerUser: registerUser, loginUser: loginUser, logoutUser: logoutUser, actionstatus: actionstatus, setActionstatus: setActionstatus ,authToken: authToken }
    useEffect(() => {
        if (loading) {

            updateToken();

        }
        let interval = setInterval(() => {  updateToken() }, 25000)
        return () => clearInterval(interval)


    }, [loading, updateToken]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}