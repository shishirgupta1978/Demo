import React, { useEffect, useState, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../log.png';
import '../../noprofile.png';
import AuthContext from '../account/AuthContext';

const Ticket = () => {
    const [data, setData] = useState({})
    const [url, setUrl] = useState("http://127.0.0.1:8000/helpdesk/ticket/")
    const [department, setDepartment] = useState({})
    const [record, setRecord] = useState({})
    const [filter_records, setFilter_records] = useState({})
    const [searchfield, setSearchfield] = useState("")
    let { user } = useContext(AuthContext);
    
    let reqInstance = axios.create({
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}` },
        }
      );
      



    const ref = useRef();



    let handleInputChange = (e) => {
        setRecord((prevState) => ({ ...prevState, [e.target.getAttribute("id")]: (e.target.value || e.target.value === '') ? e.target.value : URL.createObjectURL(e.target.files[0]) }));
    }


    let handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', e.target.title.value);
        formData.append('department', e.target.department.value);
        formData.append('description', e.target.description.value);
        formData.append('user', user?.user_id);
        if (e.target.attachment.value) {

            formData.append('attachment', e.target.attachment.files[0], e.target.attachment.files[0].name);
        }

        reqInstance.post(url, formData).then(() => {
            setRecord({});

            e.target.title.value = '';
            e.target.description.value = '';
            ref.current.value = null;
            ref.current.files = null;

            getApidata();


        }).catch((error) => { alert(error.message) })


    }

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

        reqInstance.get("http://127.0.0.1:8000/helpdesk/departments/").then((response) => {
            setDepartment(response.data);

        }).catch((error) => { alert(error.message) })

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
                {

                    <div className='col-4'><form onSubmit={handleSubmit} className="mx-3">


                        <h6 className="w-100 fw-bold fs-4 ">Add New Ticket</h6>
                        <hr className="mb-4" />

                        <input className='form-control mb-3' type="text" id="title" name="title" placeholder='Title' onChange={(e) => { handleInputChange(e) }} value={record.title ? record.title : ""} required />
                        <select className='form-control mb-3' id="department" name="department" required>
                            {
                                department && department.length > 0 ? department.map((a) => <option key={a.id} value={a.id}>{a.name}</option>) : ""
                            }

                        </select>

                        <textarea className='form-control mb-3' type="text" id="description" name="description" placeholder='Description' onChange={(e) => { handleInputChange(e) }} multiple value={record.description ? record.description : ""} required />
                        <input type="file" className='form-control mb-3' id="attachment" ref={ref} name="attachment" />

                        <div className='d-flex justify-content-center'><input type="submit" value="Add" /></div>

                    </form></div>
                }
                <div className='col-8'>
                    <div className='m-2 d-flex justify-content-end'>
                        <input type="text" className='w-50' id="search" name="search" onChange={(e) => { handleChange(e) }} placeholder='Search...' />
                    </div>
                    {


                        filter_records && filter_records.length > 0 ?
                            <div><table className='table mx-3 '><thead><tr>
                                <th>Ticket ID</th><th colSpan={2}>Title</th><th>Department</th><th>Assign to</th><th>Status</th><th>Details</th></tr></thead>
                                <tbody>
                                    {filter_records.map((row) =>
                                        <tr key={row.id}><td>{row.id}</td><td colSpan={2}><NavLink to={`/auth/helpdesk/${row.id}`}>{row.title}</NavLink></td><td>{row.department_name}</td><td>{row.assign_to ? row.assign_to_name : "N/A"}</td><td>{row.resolved === true ? "Resolved" : "Pending"}</td><td>{row.attachment ? <a href={"http://127.0.0.1:8000" + row.attachment}>Attachment</a> : ""}</td></tr>)}
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


export default Ticket