import React,{useEffect} from 'react'
import Registration from '../Components/UserRegistration/Registration'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
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
    <div>
      <Registration/>
    </div>
  )
}

export default RegistrationPage
