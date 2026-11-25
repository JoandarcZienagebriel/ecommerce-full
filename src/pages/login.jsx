import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Username from '../components/username';

import Password from '../components/tel';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../components/UserContext";
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
   
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Place Your Order
    </h2>

    <form onSubmit={handleLogin} className="space-y-5">
      <Username value={username} onChange={setUsername} />

      <Password value={password} onChange={setPassword} />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
      >
        Place Order
      </button>
    </form>

  </div>
</div>
        
     
</>

  )}