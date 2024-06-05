import React,{useState} from 'react'
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css'
import image from '../assets/image 466.png'
const Register = () => {
  const [data,setData]=useState({
    name:'',
    email:'',
    mobile:'',
    password:''
  })
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value });
  }
  const registerUser= async (e)=>{
    e.preventDefault();
    const response=await register(data);
    alert(response.data);
    navigate('/login')
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <h2>Create an account</h2>
          <h4>Your personal job finder is here</h4>
        </div>
        <div>
          <form className={styles.form} onSubmit={registerUser}>
            <input type="text" name='name' onChange={handleChange} placeholder='Name'/>
            <input type="email" name='email' onChange={handleChange} placeholder='Email' />
            <input type="tel" name='mobile' onChange={handleChange} placeholder='Mobile' />
            <input type="password" name='password' onChange={handleChange} placeholder='Password'/>
            <div className={styles.check}>
              <input type="checkbox" id='checkbox' name='checkbox' />
              <label htmlFor="checkbox">By creating an account, I agree to our terms of use and privacy policy</label>
            </div>
            <button className={styles.btn} type='submit'>Create Account</button>
          </form>
        </div>
        <div className={styles.acc}>Already have an account?<span onClick={()=>{navigate('/login')}}>
          Sign In</span></div>
      </div>
      <div className={styles.right}>
          <img className={styles.image} src={image} alt="image" />
          <div className={styles.tagLine}>Your Personal Job Finder</div>
      </div>
    </div>
  )
}

export default Register