import React, { useEffect } from 'react'
import ALogin from '../Components/AdminLogin.js/ALogin'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
const navigate=useNavigate('')
const adminIsAuth=useSelector((state)=>{
  return state.adminAuth.success
})

useEffect(()=>{
   
    if(adminIsAuth){
       navigate('/adminhome')
    }

},[])

  return (
    <div>
      <ALogin/>
    </div>
  )
}

export default AdminLoginPage
