import React, { useState, useEffect,useRef,useContext } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import AuthContext from '../account/AuthContext';

const TicketDetails = () => {
    const [data, setData] = useState({})
    let { uid } = useParams();
    const config = {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}` },
    };
    const ref = useRef();
    const ref1 = useRef();
    let {user} =useContext(AuthContext);
    let handelClose=()=>{
        axios.patch(`http://127.0.0.1:8000/helpdesk/ticket/${data.id}/`,{'resolved': true,'assign_to':user?.user_id},config).then(()=>
        {
        getApidata();
 
}).catch((error)=>{alert(error.message )})
    
    }
    let handelSubmit=()=>{
        if (ref.current.value ==null ||ref.current.value ==='')
        {
            alert("Comment can not be blank");    
        }
        else{
            const formData = new FormData();

            formData.append('text', ref.current.value);
            formData.append('user', data.user);
            formData.append('ticket', data.id);
            if(ref1.current.value)
            {
                
                formData.append('attachment', ref1.current.files[0],ref1.current.value);
            }
            

            axios.post("http://127.0.0.1:8000/helpdesk/notes/",formData,config).then(()=>
            {
                
            
        
            ref1.current.value = null;
            ref1.current.files = null;
            ref.current.value = null;
            
    
            getApidata();
            
     
    }).catch((error)=>{alert(error.message )})


        }

        
    }

    let getApidata = () => {

        axios.get(`http://127.0.0.1:8000/helpdesk/ticket/${uid}`, config).then((response) => {
            setData(response.data);
        }).catch((error) => { alert(error.message) })
    }
    useEffect(() => {
        getApidata();

    }, []);

    return (
        <div>


            {
                data && (<div>
                    <h4 className='text-center'><strong>Details of ID: </strong>{data.id}</h4>
                    <div className='row'>

                        <div className='mx-3 col-3'>
                            <p><strong>ID: </strong>{data.id}</p>

                            <p><strong>Title: </strong>{data.title}</p>

                            <p><strong>Department: </strong>{data.department_name}</p>
                            <p><strong>Assign To: </strong>{data.assign_to ? data.assign_to_name : "Not Assign"}</p>
                            <p><strong>Attachment: </strong>{data.attachment ? <a href={"http://127.0.0.1:8000" + data.attachment}>Download attachment</a> : ""}</p>
                            <p><strong>User: </strong>{data.requester_name}</p>
                            <p><strong>Created_at: </strong>{data.created_at?.substr(0, 19)}</p>
                            <p><strong>Updated_at: </strong>{data.updated_at?.substr(0, 19)}</p>
                            <p><strong>Description: </strong>{data.description}</p>
                            <p><strong>Status: </strong>{data.resolved ?"Closed":"Pending"}</p>
                            <p>{data.resolved ? "":<button onClick={()=>{handelClose()}}>Close Ticket</button>}</p>

                        </div>
                        <div className='col-8'>
                            {data.notes && data.notes.length > 0 ? (<table><thead><tr><th>Date</th><th>Comment by</th><th colSpan="2">Comment</th><th>Attachment</th></tr></thead>
                                <tbody>
                                    {data.notes.map((r) => <tr key={r.id}><td>{r.time.substr(0, 19)}</td><td>{r.username}</td><td colSpan="2">{r.text}</td><td>{r.attachment ? <a href={"http://127.0.0.1:8000" + r.attachment}>Download</a>:""}</td></tr>

                                    )}

                                </tbody>

                            </table>) : ""}
                          {  data.resolved ?"":
                        <div><textarea id="comment" style={{width:'100%'}} ref={ref} name="comment" type="text" placeholder='Add Comment'/><br/><input id="myattachment" ref={ref1} name="myattachment" type="file" />
                      <button onClick={()=>handelSubmit()} className='float-end'>Reply</button> </div> 
                      }
                        </div>
                        
                    </div>
                </div>)



            }


        </div>
    )
}

export default TicketDetails