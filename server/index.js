const port=3000;
const express=require('express');
const bodyParser=require('body-parser');
const env=require('dotenv');
env.config();
const fs=require('fs');
const path=require('path');
const cors=require('cors')
const User=require('./models/user');

const logStream=fs.createWriteStream(path.join(__dirname,'log.txt'),{
  flags:'a'//a for append
})
const errorStream=fs.createWriteStream(path.join(__dirname,'error.txt'),{
  flags:'a'
})
const app=express();
const authRoutes=require('./routes/auth')
const jobRoutes=require('./routes/job');
const { default: mongoose } = require('mongoose');

app.use(cors({
  origin:'*',
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{
  const now=new Date();
  const time=`${now.toLocaleTimeString()}`;
  const log=`${req.method} ${req.originalUrl} ${time}`
  logStream.write(log + '\n');
  next();
})
app.use('/api/auth',authRoutes);
app.use('/api/job',jobRoutes);
app.get('/',(req,res)=>{
  res.send('Hello World !!');
})

app.use((err,req,res,next)=>{
  const now=new Date();
  const time=`${now.toLocaleTimeString()}`
  const error=`${req.method} ${req.originalUrl} ${time}`
  errorStream.write(error+ err.stack +'\n')
  res.status(500).send('Internal server error');
})

app.use((req,res,next)=>{
  const now=new Date()
  const time=`${now.toLocaleTimeString()}`
  const error=`${req.method} ${req.originalUrl} ${time}`;
  errorStream.write(error + '\n');
  res.status(404).send('Route not found');
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB is Connected'))
.catch((error)=>console.log(error));

app.listen(port,()=>{
  console.log(`Server running on port ${port}`)
})