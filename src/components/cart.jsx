import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function App(){
  const[cart, setCart]= useState([]);
const[product, setProduct]= useState([]);
const[total, setTotal]=useState([])
  console.log(cart)
  const addToCart = (product)=>{
    const existingItem= cart.find((item)=>item.id === product.id)
  
      if(existingItem){
        setCart(cart.map((item)=>
           item.id === product.id ? {...item, quantity: item.quantity +1} : item
        ))

      }
      else {
       setCart([
        ...cart,
        { ...product, quantity: 1 },
      ])
      }
    }

     const removeItem = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    )
  }
  

const increaseQ = (id)=>{
   setCart(cart.map((item)=>
           item.id === id ? {...item, quantity: item.quantity +1}: item))
}

const decreaseQ = (id)=>{
   setCart(cart.map((item)=>
           item.id === id ? {...item, quantity: item.quantity - 1}: item)
  .filter((item)=>item.quantity > 0)
  )
}



useEffect(()=>{
  axios.get('http://localhost:8000/api/products/')
  .then((response)=>{
    setProduct(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
   axios.get('http://localhost:8000/api/total/')
  .then((response)=>{
    setTotal(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
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
const {token}= useContext(UserContext);
console.log("Token received in App:", token);
const handleFormSubmit = async(e)=> {
    e.preventDefault();
   console.log('cart before sending data', cart);
 
try {
  for(const item of cart){
  const response1 = 
   
       await fetch("http://localhost:8000/api/data/", {
          credentials: 'include',
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify({
            price: item.price,
            quantity: item.quantity,
            product:item.id,

          }),
        });
       
      
  if (!response1.ok ) {
    throw new Error("One or more requests failed");
  }
  }
  setCart([]);
} catch (error) {
  console.error("Submission failed:", error);
}
 
}

  return(
    <>{
  product.map((item) => (
    <div>
    <ul key={item.id}>
     
      <li>{item.name}</li>
      <li>{item.price}</li>
    </ul>
    <button onClick={()=>addToCart(item)}>add</button>
</div>
  ))
}
<h3>cart</h3>
   {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          
<p>{item.quantity}</p>

          <button
            onClick={() =>
              removeItem(item.id)
            }
          >
            Remove
          </button>
          <button onClick={()=>increaseQ(item.id)} type="button">+</button>
          <button onClick={()=>decreaseQ(item.id)} type="button">-</button>
        
        </div>
        
   ))}
Total:{
  total.map((item) => (
    <ul>
     
      <li>{item.total}</li>
      
    </ul>
  
  ))
}

    
        <button type="submit" onClick={handleFormSubmit}>Place order</button>
    
        
     
</>

  )}