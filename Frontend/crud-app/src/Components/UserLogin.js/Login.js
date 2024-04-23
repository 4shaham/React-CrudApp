import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Store/Store';


function Login() {

const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[err,setErr]=useState('')
const[validation,setValidation]=useState({
  emailErr:'',
  passwordErr:''
})
const navigate=useNavigate('')
const dispatch=useDispatch()

const handleEmailOnChange=(e)=>{
   
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setEmail(e.target.value)
  

}


const handleSubmit=async(e)=>{
e.preventDefault()

if(email.trim()=='' && password.trim()==''){
  return  setValidation({
      emailErr:'This field is required',
      passwordErr:'This field is required'
    })    
}

if(email.trim()=='' && password.trim()!=''){
 return setValidation({
     emailErr:'This field is required',
     passwordErr:''
   })    
}

if(email.trim()!='' && password.trim()==''){
  return setValidation({
      emailErr:'',
      passwordErr:'This field is required'
    })    
 }

if(email.trim()!='' && password.trim()!=''){
   setValidation({
      emailErr:'',
      passwordErr:''
    })    
}




 await axios.post('//localhost:8080/api/login', { email, password })
 .then((res)=>{
  console.log(res);
 if(res.data.isLogin){
     dispatch(setUser(res.data.userData)) 
     localStorage.setItem("user", JSON.stringify(res.data.userData)) 
     navigate('/')
 }else{
   setErr(res.data.err)
 }
 }).catch((err)=>{
  console.log(err);
 })


}

  return (
    <div className="Auth-form-container">
    <form className="Auth-form" onSubmit={handleSubmit}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="form-group mt-3">
          <small style={{color:'red'}}>{err&&err}</small><br/>
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            value={email} 
            onChange={handleEmailOnChange}
            style={{borderColor:validation.emailErr.length!=0?'red':'ll'}}
          />
          <small style={{color:'red'}}>{validation.emailErr?validation.emailErr:''}</small>
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            style={{borderColor:validation.passwordErr?'red':'ll'}}
          />
           <small style={{color:'red'}}>{validation.passwordErr?validation.passwordErr:''}</small>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
       
      </div>
    </form>
  </div>
   
  )
}

export default Login



