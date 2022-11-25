import React,{useEffect, useState,useRef} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../log.png' ;
import  '../../noprofile.png';

const Register = () => {
    const [student, setStudent]= useState({})
    const [file, setFile]= useState(null)
    const [document, setDocument]= useState({})
    const [students, setStudents]= useState({})
    const [filterstudents, setFilterstudents]= useState({})
    const [searchfield, setSearchfield]= useState("")
    const ref = useRef();


    let handleDocumentChange=(e)=>{
        
    }
    
    let handleInputChange=(e)=>{
        setStudent((prevState) => ({...prevState, [e.target.getAttribute("id")] : (e.target.value ||e.target.value=='') ? e.target.value :  URL.createObjectURL( e.target.files[0]) }));
    }

    let handleEdit=(e,key)=>{
        ref.current.value = null;
        ref.current.files = null;

        axios.get("http://127.0.0.1:8000/crud/students/"+key.toString()+"/").then((response)=>
        {
            let res=response.data;

            setStudent(res);
            
            setFile(res['profile_pic'])
            setDocument(res['document'])
            
    }).catch((error)=>{console.log(error)})

    }

    let handleDelete=(e,key)=>{
        axios.delete("http://127.0.0.1:8000/crud/students/"+key.toString()+"/").then((response)=>
        {
            getApidata();
    }).catch((error)=>{e.preventDefault();console.log("TTT"+error)})

    }
    let handleSubmit=(e)=>{
e.preventDefault();
const formData = new FormData();
formData.append('name', e.target.name.value);
formData.append('father_name', e.target.father_name.value);
formData.append('age', e.target.age.value);
if(e.target.profile_pic.value)
{
   
formData.append('profile_pic', e.target.profile_pic.files[0],e.target.profile_pic.files[0].name);
}
if(e.target.document.value)
{
    
formData.append('document', e.target.document.files[0],e.target.document.files[0].name);
}

if(e.target.id.value)
{
    
    axios.patch("http://127.0.0.1:8000/crud/students/"+e.target.id.value.toString()+"/",formData).then(()=>
        {
            setStudent({});
            setFile('');
            setDocument('');
            e.target.name.value='';
            e.target.father_name.value='';
            e.target.age.value='';
            getApidata();
        
                 
    }).catch((error)=>{alert(error.message )})



}else{
   
axios.post("http://127.0.0.1:8000/crud/students/",formData).then(()=>
        {
            setStudent({});
            setFile('');
            setDocument('');
            e.target.name.value='';
            e.target.father_name.value='';
            e.target.age.value='';

            getApidata();
            
     
    }).catch((error)=>{alert(error.message )})


    }
}
let handleChange=(event)=>{
    setSearchfield(event.target.value)
    if(event.target.value)
    {
        if(students.length>0){
            setFilterstudents(students.filter((el)=> el.name.toLowerCase().startsWith(event.target.value.toLowerCase()) ))

        }
    
    }else{
        setFilterstudents(students)

    }
    
}
  let getApidata=()=>{
    axios.get("http://127.0.0.1:8000/crud/students/").then((response)=>
        {setStudents(response.data);
            
            setFilterstudents(response.data.filter((el)=> el.name.toLowerCase().startsWith(searchfield ? searchfield.toLowerCase():'') ))
        
    }).catch((error)=>{alert(error.message)})
  }  
    useEffect(()=>{
        getApidata();

    },[]);
  return (
    <div className='container-fluid p-3'>
    <div className='row'>
        <div className='col-4'><form onSubmit={handleSubmit} className="mx-3">
        <NavLink to="/products" className="btn-close float-end border border-dark" aria-label="Close"/>
      

      <h6 className="w-100 fw-bold fs-4 ">{student.id ? "Update Record": "Add New Record"}</h6>
      <hr className="mb-4" />
            <div className='d-flex justify-content-center'>
           
            <label htmlFor="profile_pic"><img className="avatar" style={{width:'100px', height:'100px'}} alt="ProfilePic" src={file? file: require('../../noprofile.png')}/></label>
            </div> <input style={{visibility:'hidden'}} type="file" accept="image/png, image/jpeg" id="profile_pic" onChange={(e)=>{setFile(URL.createObjectURL(e.target.files[0]))}} name="profile_pic" required ={student.profile_pic? false:true}/>
                
           
            {student.id ? <input  className='form-control mb-3' type="hidden" id="id" name="id" placeholder='id' value={student.id} disabled/>:""}
            
            <input className='form-control mb-3' type="text" id="name" name="name" placeholder='name' onChange={(e)=>{handleInputChange(e)}} value={student.name ? student.name: ""} required/>
            <input className='form-control mb-3' type="text" id="father_name" name="father_name" placeholder='Father name' onChange={(e)=>{handleInputChange(e)}} value={student.father_name?student.father_name:"" } required/>
            <input className='form-control mb-3' type="text" id="age" name="age" placeholder='Age' onChange={(e)=>{handleInputChange(e)}} value={student.age? student.age:""} required/>
            <input type="file" className='form-control mb-3' id="document" ref={ref} onChange={(e)=>{setDocument(URL.createObjectURL(e.target.files[0]))}} name="document" required ={student.document? false:true}/>
           
            <div className='d-flex justify-content-center'><input type="submit" value={student.id ? "Update": "Add"} /></div>
            
            </form></div>
        <div className='col-8'>
            <div className='m-3 d-flex justify-content-end'>
            <input type="text" className='w-50' id="search" name="search" onChange={(e)=>{handleChange(e)}} placeholder='Search...'/>
            </div>
            {
                filterstudents && filterstudents.length >0 ?
                <div><table className='table mx-3 '><thead><tr>
                    <th>ID</th><th>Profile Pic</th><th>Name</th><th>Father Name</th><th>Age</th><th colSpan="2">Action</th></tr></thead>
                    <tbody>
                        {filterstudents.map((st) => 
                        <tr key={st.id}><td>{st.id}</td><td><img src={st.profile_pic} className="avatar" /></td><td>{st.name}</td><td>{st.father_name}</td><td>{st.age}</td><td colSpan="2"><i onClick={(event)=>handleEdit(event,st.id)} className="fa fa-pencil m-3" aria-hidden="true"></i> <i onClick={(event)=>handleDelete(event,st.id)} className="fa-regular fa-trash-can m-3" aria-hidden="true"></i> <a href={st.document}><i className="fa fa-download m-3" aria-hidden="true"></i></a> 
                         </td></tr>)}
                    
                        </tbody>
                    </table></div> :<h1>User not Found</h1>
            }

        </div>

    </div></div>
  )
}

export default Register