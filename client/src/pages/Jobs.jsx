import React, { useEffect, useState } from 'react'
import { getAllJobs } from '../services/jobs'
import { useNavigate } from 'react-router-dom';
const Jobs = () => {
  const [jobs,setJobs]=useState([]);
  const [skills,setSkills]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    getAllJobs({skills:''})
    .then((response)=>{
      setJobs(response.data);
    }).catch((error)=>{
      console.log(error);
      setJobs([])
    })
  },[]);
  const gotoJobDetails=(id)=>{
    navigate(`/job/${id}`);
  }
  const triggerSearch=()=>{
    getAllJobs({skills})
    .then((response)=>{setJobs(response.data)})
    .catch((error)=>{
      console.log(error);
      setJobs([]);
    })
  }
  return (
    <div>
      <h1>Jobs</h1>
      {localStorage.getItem('token') && <><button style={{
              padding:'5px 10px',
              backgroundColor:'#ED5353',
              color:'white',
              border:'none',
              cursor:'pointer',
              borderRadius:'5px',
              marginTop:'5px'
            }}
       onClick={()=>navigate('/createjob')}>Create Job</button>
       <input style={{width:'300px'}} type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder='Search by skills(separated by comma)' />
       <button style={{
              padding:'5px 10px',
              backgroundColor:'#ED5353',
              color:'white',
              border:'none',
              cursor:'pointer',
              borderRadius:'5px',
              marginTop:'5px'
            }} onClick={triggerSearch}>Search</button>
       </>
       }
      <ul>
        {jobs.map((job)=>(
          <li key={job._id}>
            <h3>{job.title}</h3>
            <div style={{display:'flex',justifyContent:'space-between',width:'200px'}}>
              <p>{job.location}</p>
              <p>{job.salary}</p>
            </div>
            
            <div style={{display:'flex',justifyContent:'space-between',width:'200px'}}>
              <p>{job.locationType}</p>
              <p>{job.jobType}</p>
            </div>
            <div>
              {job.skills.map((skill,idx)=>(<span style={{marginRight:'5px'}} key={idx}>{skill}</span>))}
            </div>
            <button style={{
              padding:'5px 10px',
              backgroundColor:'#ED5353',
              color:'white',
              border:'none',
              cursor:'pointer',
              borderRadius:'5px',
              marginTop:'5px'
            }} onClick={()=>gotoJobDetails(job._id)} >View Details</button>
            {localStorage.getItem('token') && <button style={{
              padding:'5px 10px',
              backgroundColor:'#ED5353',
              color:'white',
              border:'none',
              cursor:'pointer',
              borderRadius:'5px',
              marginTop:'5px'
            }}
       onClick={()=>navigate(`/edit/${job._id}`)}>Edit Job</button>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Jobs