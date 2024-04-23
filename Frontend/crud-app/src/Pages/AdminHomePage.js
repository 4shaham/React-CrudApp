import axios from "axios";
import qs from 'query-string';
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import AdminAdduser from "../Components/AdminAdduser/AdminAdduser";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from "../Redux/Store/Store";

function AdminHomePage() {
  const [userDatas, setUserDatas] = useState([]);
  const [visible, setVisible] = useState(false);
  const[count,setCount]=useState(0)

const navigate=useNavigate('')
const adminIsAuth=useSelector((state)=>{
  return state.adminAuth.success
})

const dispatch=useDispatch()

useEffect(()=>{
   
    if(!adminIsAuth){
       navigate('/adminlogin')
    }

},[])


  const hadnleCallback=(data)=>{

   setCount(data)

  }

  useEffect(() => {
    axios
      .get("//localhost:8080/api/userDetails")
      .then((response) => {
        const { userDatas } = response.data;
        setUserDatas(userDatas);
        setVisible(false)
      })
      .catch((err) => {
        console.log(err);
      });
  },[count]);

  const handleLogoutClick=()=>{

   dispatch(adminLogout())
   localStorage.removeItem('adminAuth');
   navigate('/adminlogin')
   
  }


  const handleDeleteclick=async(id)=>{

    console.log(id,'iddkjddhdhfhd');
    axios.delete(`//localhost:8080/api/deletUser?id=${id}`)
    .then((res)=>{
      console.log(res)
      setCount(count+1)
    })
    .catch((err)=>console.log(err))
      
  }

  return (
    <div>
      <div style={{ background: "black", color: "white" }}>
       
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin User Management
        </h1>
        <button style={{marginLeft:'1400px',background:'red',borderColor:'red',color:'white'}} onClick={handleLogoutClick}>Logout</button>
      </div>

      <div>
        {!visible ? (
          <button
            style={{ marginLeft: "150px", marginTop: "50px" }}
            onClick={() => setVisible(true)}
          >
            Add user
          </button>
        ) : (
          <button
            style={{ marginLeft: "150px", marginTop: "50px" }}
            onClick={() => setVisible(false)}
          >
            Cancel
          </button>
        )}

        {visible && <AdminAdduser fn={hadnleCallback} data={count}/>}

      </div>

      <div
        style={{
          marginTop: "50px",
          marginLeft: "150px",
          marginRight: "150px",
          background: "black",
          color: "white",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Image
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Username
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Email
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Delete
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {userDatas.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    maxWidth: "50px",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {user.userName}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {user.email}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <button style={{ background: "red" }}  onClick={handleDeleteclick.bind(null, user._id) } >Delete</button>
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <button style={{ background: "green" }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHomePage;
