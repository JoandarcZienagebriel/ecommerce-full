import axios from "axios";
import { useEffect, useState } from "react";
import Username from '../components/username';
import Email from '../components/email';
import Password1 from '../components/tel';
import Password2 from '../components/text';
import { useNavigate } from 'react-router-dom';

export default function App(){
  const[username, setUsername]= useState('');
  const[email, setEmail]= useState('');
  const[password1, setPassword1]= useState('');
  const[password2, setPassword2] = useState('');

  const navigate = useNavigate()
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

const handleFormSubmit = async(e)=> {
    e.preventDefault();
      // CHECK WHAT YOU HAVE
    console.log("username:", username); 
    console.log("email:", email);
    console.log("password1:", password1);
    console.log("password2:", password2);
try {
  const response1 = await
    fetch("http://localhost:8000/api/v1/rest-auth/registration/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken
      },
     
      body: JSON.stringify({
        username:username,
        email: email,
        password1: password1,
        password2: password2,
      })
      
      ,
    })
  if (!response1.ok) {
    throw new Error("One or more requests failed");
  }
navigate('/login');
  console.log("Both APIs received successful requests!");

  setUsername("");
  setEmail("");
  setPassword1("");
  setPassword2("");
navigate('/login');
}
catch (error) {
  console.error("Submission failed:", error);
}
}

  return(
    <>
  
          
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
      Place Your Order
    </h2>

    <form onSubmit={handleFormSubmit} className="space-y-5">

     Username: <Username value={username} onChange={setUsername}/>

      Email:<Email value={email} onChange={setEmail} />

   Password: <Password1 value={password1} onChange={setPassword1} />

      Password2: <Password2 value={password2} onChange={setPassword2} />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
      >
        Place Order
      </button>

    </form>
  </div>
</div>
        
     
</>

  )}