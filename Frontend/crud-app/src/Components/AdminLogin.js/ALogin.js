import React, { useReducer, useState } from 'react'
import './Alogin.css'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../Redux/Store/Store';
import { useDispatch } from 'react-redux';


function  ALogin() {


const[formDetails,setFormDetails]=useState({email:'',password:''})
const [emailValidation,setEmailValidation]=useState(false)
const navigate=useNavigate('')
const dispatch=useDispatch()

const onChangeEmail = (e, isValidEmail) => {
  const email = e.target.value;
 function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const as=isValidEmail(email)

  if(as){
    setEmailValidation(true)
  }else{
    setEmailValidation(false)
  }

  setFormDetails({ email: email, password: formDetails.password });
};

const onSubmit=(e)=>{
  e.preventDefault()
 

  if(formDetails.email.trim()=='' || formDetails.password.trim()==''){
       return alert('plese fill all data all field are requied')
  }

  if(!emailValidation){
      return alert('you didnot follow correct email format')
  }

  const{email,password}=formDetails

  axios.post( '//localhost:8080/api/adminLogin',{email,password})
  .then((response)=>{
    const{adminIsLoged}=response.data
    console.log(response,adminIsLoged);
     
    if(adminIsLoged){
      
        dispatch(setAdmin()) 
        localStorage.setItem("adminAuth", JSON.stringify(1))
        navigate('/adminHome')

    }




  }).catch((err)=>{
    console.log(err)
  })



}

  return (
    <div className="Auth-form-container bg-dark">
    <form className="Auth-form" onSubmit={onSubmit} >
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Admin Sign in</h3>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="emai"
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={onChangeEmail}
          />
          <small style={{color:'red'}}>{!emailValidation?'email is not valid':''}</small>
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e)=>setFormDetails({email:formDetails.email,password:e.target.value})}
          />

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

export default ALogin
