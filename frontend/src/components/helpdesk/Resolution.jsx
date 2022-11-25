import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../log.png';
import '../../noprofile.png';
import AuthContext from '../account/AuthContext';

const Resolution = () => {
    const [data, setData] = useState({})
    const [url, setUrl] = useState("http://127.0.0.1:8000/helpdesk/department_ticket/")
    const [filter_records, setFilter_records] = useState({})
    const [searchfield, setSearchfield] = useState("")
    let { user } = useContext(AuthContext);
    let assignTicket=(a)=>{
        const config = {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}` },
        };
        axios.patch(`http://127.0.0.1:8000/helpdesk/department_ticket/${a}/`,{'assign_to':user?.user_id},config).then(()=>
        {
        getApidata();
 
}).catch((error)=>{alert(error.message )})
    


        }    
    let reqInstance = axios.create({
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}` },
        }
      );
      








    let handleChange = (event) => {
        setSearchfield(event.target.value)

        if (event.target.value !== null && event.target.value !== undefined && event.target.value !== '') {
            if (data?.results.length > 0) {
                setFilter_records(data?.results.filter((el) => { return (el.title.toLowerCase().includes(event.target.value.toLowerCase()) || el.department_name.toLowerCase().startsWith(event.target.value.toLowerCase()) || el.id.toString().toLowerCase().startsWith(event.target.value.toLowerCase())) }));

            }

        } else {
            setFilter_records(data?.results)

        }

    }
    let getApidata = () => {


        reqInstance.get(url).then((response) => {
            
            setData(response.data);
            if (searchfield) {
                setFilter_records(response.data?.results.filter((el) => el.title.toLowerCase().startsWith(searchfield.toLowerCase()) || el.id.toString().toLowerCase().startsWith(searchfield.toLowerCase()) || el.assign_to ? el.assign_to.toLowerCase().startsWith(searchfield.toLowerCase()) : false || el.department_name ? el.department_name.toLowerCase().startsWith(searchfield.toLowerCase()) : false))
            }
            else {
                setFilter_records(response.data?.results)
            }
        }).catch((error) => { alert(error.message) })
    }    

    useEffect(() => {
        getApidata();
            }, [url]);
    return (
        <div className='container-fluid p-3'>
            <div className='row'>
                
                <div className='col-12'>
                    <div className='m-2 d-flex justify-content-end'>
                        <input type="text" className='w-50' id="search" name="search" onChange={(e) => { handleChange(e) }} placeholder='Search...' />
                    </div>
                    {


                        filter_records && filter_records.length > 0 ?
                            <div><table className='table mx-3 '><thead><tr>
                                <th>Ticket ID</th><th>Requester</th><th colSpan={2}>Title</th><th>Department</th><th>Assign to</th><th>Status</th><th>Details</th></tr></thead>
                                <tbody>
                                    {filter_records.map((row) =>
                                        <tr key={row.id}><td>{row.id}</td><td>{row.requester_name.substr(0, 10)}</td><td colSpan={2}><NavLink to={`/auth/resolution/${row.id}`}>{row.title}</NavLink></td><td>{row.department_name}</td><td>{row.assign_to ? row.assign_to_name : <button onClick={()=>{assignTicket(row.id)}}>Assign Ticket</button>}</td><td>{row.resolved === true ? "Resolved" : "Pending"}</td><td>{row.attachment ? <a href={"http://127.0.0.1:8000" + row.attachment}>Attachment</a> : ""}</td></tr>)}
                                </tbody>
                            </table></div> : <p>Records not Found</p>
                    }
                    <div className='d-flex justify-content-end'>

                        {data?.previous ? <button onClick={() => { setUrl(data?.previous) }}>Previous</button> : ""}{data?.next ? <button onClick={() => { setUrl(data?.next) }}>Next</button> : ""}
                    </div>
                </div>

            </div></div>
    )
}


export default Resolution