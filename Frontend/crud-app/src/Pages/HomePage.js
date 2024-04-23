import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { logout } from "../Redux/Store/Store";
import { useNavigate } from "react-router-dom";


function HomePage() {

  const data = useSelector((state) => {
    return state.auth.success;
  });
  const userData = useSelector((state) => {
    return state.auth.user;
  });
  const { userName, email, imageUrl } = userData;
  
  

  const dispatch=useDispatch()
  const navigate=useNavigate('')


  useEffect(()=>{
      if(!data){
          navigate('/login')
      }
  },[])

  const handleLogout=()=>{
    console.log('hiiii');   
    localStorage.removeItem('user');
    dispatch(logout()) 
     navigate('/login')

  }

  console.log(data, "looo");
  return (
    <div>
      <h1 style={{textAlign:'center',color:'white'}}>Home page</h1>
      <div class="card-container">
        <img class="round" src={imageUrl} width={200} alt="user" />
        <h3>{userName}</h3>
        <h6>New York</h6>
        <p>{email}</p>
        <div class="buttons">
          <button class="primary" style={{ background: "white" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
