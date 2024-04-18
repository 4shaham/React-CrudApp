import React, { Suspense } from 'react'
import './App.css';
import {Route, Routes} from 'react-router-dom'


//  lazy  loading 

const LoginPageLazy=React.lazy(()=> import('./Pages/LoginPage'))
const HomePageLazy=React.lazy(()=> import('./Pages/HomePage'))
const RegistrationPageLazy=React.lazy(()=>import('./Pages/RegistrationPage'))
const AdminHomePageLazy=React.lazy(()=>import('./Pages/AdminHomePage'))
const AdminLoginPageLazy=React.lazy(()=> import('./Pages/AdminLoginPage'))




function App() {
  return (
    <>
    <Suspense fallback={<div>...loading</div>}>
     <Routes>
      <Route path='/' element={<HomePageLazy/>} ></Route>
      <Route path='/login' element={<LoginPageLazy/>}  ></Route>
      <Route path='/Registration' element={<RegistrationPageLazy/>}></Route>
      <Route path='/adminLogin' element={<AdminHomePageLazy/>} ></Route>
      <Route path='/adminHome' element={<AdminLoginPageLazy/>}></Route>
     </Routes>
     </Suspense> 

    </>
  );
}

export default App;
