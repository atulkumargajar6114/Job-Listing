import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { createJob ,getJobById,updateJob} from '../services/jobs';
const CreateJob = () => {
  const navigate=useNavigate();
  const url=new URL(window.location.href);
  const isEdit=url.pathname.includes('edit');
  const [data,setData]=useState({
    skills:'',
    title:'',
    companyName:'',
    location:'',
    salary:'',
    description:'',
    locationType:'',
    jobType:'',
  })
  const handleChange=(e)=>{
    setData((data)=>{
      return {...data,[e.target.name]:e.target.value}
    });
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
   if(isEdit){
    const id=url.pathname.split('/')[2];
    const response=await updateJob(id,data);
    if(response.status===200){
      alert('Job updated successfully')
      navigate('/jobs');
    }else{
      alert('Error updating Job');
    }
   }else{
    const response=await createJob(data);
    alert(response.data);
    if(response.status===201){
      navigate('/jobs');
    }
   }
  }
   
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }else{
      if(isEdit){
        const id=url.pathname.split('/')[2];
        const res=getJobById(id);
        res.then((response)=>{
          const skills=response.data.skills.join(',');
          setData({...response.data,skills});
        })
      }
    }
  },[])
  return (
    <>CreateJob
    <form style={{
      display:'flex',
      flexDirection:'column',
      gap:'10px',
      width:'300px',
      margin:'auto'
    }} onSubmit={handleSubmit}>
      <input type="text" name='title' id='title' onChange={handleChange} placeholder='Title' value={data.title}/>
      <input type="text" name='companyName' id='companyName' onChange={handleChange} placeholder='Company Name' value={data.companyName}/>
      <input type="text" name='location' id='location' onChange={handleChange} placeholder='Location' value={data.location}/>
      <input type="text" name="salary" id="salary" onChange={handleChange} placeholder='Salary' value={data.salary}/>
      <textarea type="text" name='description' id='description' onChange={handleChange} placeholder='Description' value={data.description}/>
      <select name="locationType" id="locationType" onChange={handleChange} placeholder='LocationType' value={data.locationType}>
        <option value={""}>Choose Location</option>
        <option value="Remote">Remote</option>
        <option value="Office">Office</option>
      </select>
      <select name="jobType" id="jobType" onChange={handleChange} placeholder='JobType' value={data.jobType}>
        <option value={""}>Choose Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <input type="text" name='skills' id='skills' onChange={handleChange} placeholder='Add skills and seperate it by commas' value={data.skills} />
      {data.skills.split(',').map((skill,idx)=>(
        <span style={{
          marginRight:'5px'
        }} key={idx}>{skill}</span>
      ))}
      
      {isEdit ? <button type='submit'>Update Job</button>:<button type='submit'>Create Job</button>}
    </form>
    </>
  )
}

export default CreateJob