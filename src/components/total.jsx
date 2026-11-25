import axios from "axios";
import { useEffect, useState } from "react";


export default function App(){
  
  const[total, setTotal]= useState([]);
  const[user, setUser]=useState([]);

useEffect(()=>{

  axios.get('http://127.0.0.1:8000/api/total/')
  .then((response)=>{
    setTotal(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
  axios.get('http://127.0.0.1:8000/api/user/')
  .then((response)=>{
    setUser(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
}, [])


  return(
    <>
    <h2>User</h2>
            {user.map((item)=>(
      <ul>
        
         <li>{item.name}</li>
         <li>{item.user}</li>
         <li>{item.email}</li>
         <li>{item.tel}</li>
          
      </ul>
           
          ))}
   
<h2>Total</h2>
      
      <ul>
        
         <li>{total.total}</li>

          
      </ul>
           
  

       
     
</>

  )}