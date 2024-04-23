import React, { useState } from "react";
import "./AdminAdduser.css";
import "bootstrap/dist/css/bootstrap.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/Config";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

function AdminAdduser({fn,data}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [percent, setPercent] = useState(0);
  const navigate=useNavigate('')

  const handleClick = async () => {
    try {
      if (
        userName.trim() == "" &&
        email.trim() == "" &&
        password.trim() == "" &&
        image == null
      ) {
        return;
      }

      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("jilll");
          setPercent(percent);
        },
        (error) => {
          console.error("Error during upload:", error);
          alert("Error uploading image. Please try again."); // Show error to user
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("Download URL:", url);
            alert("Image uploaded successfully!"); // Show success message to user

            axios.post('//localhost:8080/api/adminCreateUser', { email, password,userName,url})
            .then((response)=>{
              console.log(response,response.data.registration);
              if(response.data.registration){
                fn(data+1)
              }
            }).catch((err)=>{
              console.log(err);
            })


          });
        }
      );
    } catch (error) {
      console.error("whu:", error);
      alert("please selct a image."); // Show error to user
    }

    console.log(userName, email, password);
  };

  return (
    <div className="Auth-form-content">
      <h3 className="Auth-form-title">Add user</h3>

      <div className="form-group mt-3">
        <label>User name</label>
        <input
          className="form-control mt-1"
          placeholder="Enter email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="form-group mt-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control mt-1"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Profile image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      {image ? (
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        ></img>
      ) : (
        ""
      )}

      <div className="d-grid gap-2 mt-3">
        <button onClick={handleClick} className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
}

export default AdminAdduser;
