import axios from "axios";
import { useEffect, useState } from "react";
import Username from './username';

import Password from './tel';
import { useNavigate } from 'react-router-dom';
export default function App(){
  const[username, setUsername]= useState('');
  const[password, setPassword]= useState('');
 
  const navigate= useNavigate()
useEffect(()=>{
   axios.get("http://localhost:8000/api/csrf/", {
  withCredentials: true
})
.catch((error)=>{
    console.error(error);
  })

}, [])

const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
};
const csrfToken = getCookie("csrftoken");
const handleLogin = async(e)=> {
    e.preventDefault();
  
    console.log("username:", username); 
    console.log("password:", password);
try {
  const response = await
    fetch("http://localhost:8000/api/v1/rest-auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
         "X-CSRFToken": csrfToken,
      },
     

      body: JSON.stringify({
        username:username,
       password: password,
  
      })
    })
 const data = await response.json();
 const token = data.key;

  console.log("Django response:", data);

  if (!response.ok) {
    console.log("Login failed:", data);
    return;
  }

      localStorage.setItem("authToken", token);

      console.log("Login successful!");

      navigate("/shop");


} catch (error) {
  console.error("Submission failed:", error);
}
}

  return(
    <>
   
          
<h2>Form</h2>

         <form onSubmit={handleLogin} >
           <Username value={username} onChange={setUsername} />
        
          <Password value={password} onChange={setPassword}/>
         <button type="submit"> Place order</button>
      
         </form>
</>

  )}