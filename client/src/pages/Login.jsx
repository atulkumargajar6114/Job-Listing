import React, { useState } from 'react'
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import image from '../assets/image 466.png'
const Login = () => {
  const [data,setData]=useState({
    email:'',
    password:'',
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleLogin=(e)=>{
    e.preventDefault();
    login(data).then((response)=>{
      alert(`Welcome ,${response.data.name}`);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userId',response.data.userId);
      navigate('/jobs')
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <h2>Already have an account?</h2>
          <h4>Your personal job finder is here</h4>
        </div>
        <div>
          <form className={styles.form} onSubmit={handleLogin}>
            <input type="email" name='email' onChange={handleChange} placeholder='Email' />
            <input type="password" name='password' onChange={handleChange} placeholder='Password'/>
            <button className={styles.btn} type='submit'>Sign in</button>
          </form>
        </div>
        <div className={styles.acc}>Don’t have an account?<span onClick={()=>{navigate('/register')}}>
          Sign Up</span></div>
      </div>
      <div className={styles.right}>
          <img className={styles.image} src={image} alt="image" />
          <div className={styles.tagLine}>Your Personal Job Finder</div>
      </div>
    </div>
  )
}

export default Login