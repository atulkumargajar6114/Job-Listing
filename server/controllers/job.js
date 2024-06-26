const Job=require('../models/job');
const createJob=async (req,res,next)=>{
  try {
    const {title,companyName,location,salary,description,locationType,jobType,skills}=req.body;
    if(!title || !companyName || !location || !salary || !description || !locationType || !jobType || !skills){
      return res.status(400).send('Please fill all the fields');
    }
    const skillsArray=skills.split(',').map(skill=>skill.trim());
    const newJob=new Job({title,companyName,location,salary,description,locationType,jobType,skills:skillsArray,refUserId:req.userId,createdAt:new Date(),updatedAt:new Date()});
    await newJob.save();
    res.status(201).send('Job created successfully');
  } catch (error) {
    next(error);
  }
}

const getAllJobs= async (req,res,next)=>{
  const {skills}=req.query;
  const skillsArray=skills!==undefined ? skills.split(',').map((skill)=>skill.trim()):null;
  try {
   if(skills?.length===0 || skillsArray===null){
    const jobs=await Job.find().select(['title','skills','salary','location','jobType','locationType']).sort({createdAt:-1});
    res.status(200).send(jobs);
   }else{
    const jobs=await Job.find({skills:{$in:skillsArray}}).select(['title','skills','salary','location','jobType','locationType']).sort({createdAt:-1});
    res.status(200).send(jobs);
   }
  } catch (error) {
    next(error);
  }
}

const getJobById= async (req,res,next)=>{
  try {
    const {id}=req.params;
    const job=await Job.findById(id);
    if(!job){
      return res.status(404).send('Job not found');
    }
    res.status(200).send(job);
  } catch (error) {
    next(error);
  }
}

const updateJob=async (req,res,next)=>{
  try {
    const {jobnumber}=req.params;
    const job=await Job.findById(jobnumber);
    const skillsArray=req.body.skills ? req.body.skills.split(',').map(skill=>skill.trim()):null;
    const updatedJob=await Job.findByIdAndUpdate(
      jobnumber,{
        title: req.body.title || job.title,
        companyName: req.body.companyName || job.companyName,
        location: req.body.location || job.location,
        salary: req.body.salary || job.salary,
        description: req.body.description || job.description,
        locationType: req.body.locationType || job.locationType,
        jobType: req.body.jobType || job.jobType,
        skills: skillsArray || job.skills,
        updatedAt: new Date(),
        createdAt:job.createdAt,
      },{new:true}
    );
    res.status(200).send(updatedJob);
  } catch (error) {
    next(error);
  }
}

module.exports={createJob,getAllJobs,getJobById,updateJob};