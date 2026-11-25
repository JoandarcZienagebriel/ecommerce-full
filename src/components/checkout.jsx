import axios from "axios";
import { useEffect, useState } from "react";

export default function App(){

  const[total, setTotal]= useState([])


  useEffect(()=>{
  

  axios.get('http://127.0.0.1:8000/api/total/')
  .then((response)=>{
    setTotal(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
 
}, [])

  return(
    <>
  
<h3>cart</h3>

         
  
</>

  )}