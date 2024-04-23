import React, { Suspense, useEffect } from 'react'
import './App.css';
import {Route, Routes} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux';
import { setAdmin, setUser } from './Redux/Store/Store';



//  lazy  loading 
const LoginPageLazy=React.lazy(()=> import('./Pages/LoginPage'))
const HomePageLazy=React.lazy(()=> import('./Pages/HomePage'))
const RegistrationPageLazy=React.lazy(()=>import('./Pages/RegistrationPage'))
const AdminHomePageLazy=React.lazy(()=>import('./Pages/AdminHomePage'))
const AdminLoginPageLazy=React.lazy(()=> import('./Pages/AdminLoginPage'))





function App() {

  const adminAuth=useSelector((state)=>{
    return state.adminAuth.success
  })

  
  console.log(adminAuth,'authstatus admin')

  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const AdminLocalStorage=JSON.parse(localStorage.getItem("adminAuth"))
  const dispatch=useDispatch()

  useEffect(()=>{

    if(userLocalStorage){
       dispatch(setUser(userLocalStorage))
    }

    if(AdminLocalStorage){
       dispatch(setAdmin())
    }
    
  },[])


  return (
    <>
    
     <Suspense fallback={<div>...loading</div>}>
      <Routes>
         <Route path='/' element={<HomePageLazy/>} ></Route>
         <Route path='/login' element={<LoginPageLazy/>}  ></Route>
         <Route path='/Registration' element={ <RegistrationPageLazy/>}></Route>
         <Route path='/adminLogin' element={<AdminLoginPageLazy/>} ></Route>
         <Route path='/adminHome' element={<AdminHomePageLazy/>}></Route>
      </Routes>
     </Suspense> 
 
    </>
  );
}

export default App;
