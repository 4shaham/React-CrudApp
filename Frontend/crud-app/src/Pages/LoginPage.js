import React, { useEffect } from 'react'
import Login from '../Components/UserLogin.js/Login'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function LoginPage() {


  const isAuth=useSelector((state)=>{
    return state.auth.success;
  })
  const navigate=useNavigate('')

  useEffect(()=>{

   if(isAuth){
     navigate('/')
   }

  },[])


  return (
   <div style={{background:'white'}}>
    <Login/>
   </div>
  )
}

export default LoginPage
