import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import Base from './Base';
import TicketDetails from '../helpdesk/TicketDetails';
import { Home } from './Home';
import CrudRegister from '../crud/Register';
import Login from "./Login";
import ContactUs from './ContactUs';
import SendPasswordResetMail from './SendPasswordResetMail';
import { AuthProvider } from './AuthContext';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';
import ChangePassword from './ChangePassword'
import PageNotFound from './PageNotFound';
import Register from './Register'
import AboutUs from './AboutUs';
import Tnc from './Tnc';
import ActivationSuccess from './ActivationSuccess';
import ResetPassword from './ResetPassword';
import Ticket from '../helpdesk/Ticket';
import Resolution from '../helpdesk/Resolution';
import ResolutionDetails from '../helpdesk/ResolutionDetails';
import ProfileUpdate from './ProfileUpdate';

const Account = () => {
    return (
        <BrowserRouter>
            <AuthProvider>

                <Routes>

                    <Route path="/" element={<Base />}>
                        <Route index element={<Navigate to="/products" />} />
                        <Route path="products" element={<Home />} />
                        <Route path="auth" element={<Auth />} >
                        <Route path="login" element={<Login/>} />
                        <Route path="register" element={<Register/>} />
                        <Route path="tnc" element={<Tnc/>} />
                        
                        <Route path="sendpasswordresetemail" element={<SendPasswordResetMail/>} />
                        <Route path="changepassword" element={<ChangePassword/>} />

                        <Route path="changepassword1" element={<PrivateRoute><ChangePassword/></PrivateRoute>} />
                        <Route path="helpdesk" element={<PrivateRoute><Ticket/></PrivateRoute>} />
                        <Route path="profile" element={<PrivateRoute><ProfileUpdate/></PrivateRoute>} />
                        <Route path="helpdesk/:uid" element={<PrivateRoute><TicketDetails/></PrivateRoute>} />
                        <Route path="resolution/:uid" element={<PrivateRoute><ResolutionDetails/></PrivateRoute>} />
                        <Route path="resolution" element={<PrivateRoute><Resolution/></PrivateRoute>} />
                         

                        <Route path="*" element={<PageNotFound/>} />
                        </Route>
                        <Route path="contactus" element={<ContactUs />} />
                        <Route path="aboutus" element={<AboutUs />} />
                        <Route path="ab" element={<ChangePassword />} />
                        <Route path="crud" element={<CrudRegister/>} />
                        <Route path="password/reset/confirm/:uid/:token" element={<ResetPassword/>} />
                    </Route>
                    <Route path="/activate/:uid/:token" element={<ActivationSuccess/>} />
                    
                    

                    


                </Routes>

            </AuthProvider>
        </BrowserRouter>
    )
}

export default Account