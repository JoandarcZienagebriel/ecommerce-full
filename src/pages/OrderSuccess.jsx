import axios from "axios";
import { UserContext } from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import { formatPrice } from '../utils/format';
import { useLocation } from "react-router-dom";
export default function OrderSuccess(){
const [totalResponse, setTotalResponse]=useState(0);
const[cart, setCart]=useState([]);
const[authenticated, setAuthenticated]=useState();
const API_URL = import.meta.env.VITE_API_URL;
const location=useLocation()
const guestId = location.state?.guest_id;
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
useEffect(()=>{
const token=localStorage.getItem('authToken');
setAuthenticated(!!token)
console.log('token',token)
}, [])
 useEffect(() => {
if(authenticated){
  axios.get(`${API_URL}/api/csrf/`, {
    withCredentials: true
  })
  .then(() => {
    const csrfToken = getCookie("csrftoken");

    return axios.get(
      `${API_URL}/api/data`,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken
        }
      }
    );
  })
  .then((response) => {
    setCart(response.data);
  })
  .catch((error) => {
    console.error("Error fetching product:", error);
  })

 
}
  else if(guestId){
    
  axios.get(`${API_URL}/api/total/?guest_id=${guestId}`,{
      withCredentials:true,
       
      })
      .then((response)=>{
        console.log('total:',response.data)
        setTotalResponse(response.data[0].total)
        
})
  
        
  .catch((error)=>{
    console.error('error', error);
  });
   axios.get(
      `${API_URL}/api/data/?guest_id=${guestId}`,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken
        }
      }
    )
  .then((response) => {
    setCart(response.data);
  })
  .catch((error)=>{
    console.error('error', error);
  });
  }
 

}, [guestId, token]);

return (

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-4xl font-bold">
Thank You 🎉
</h1>


<p className="mt-4">
Your order has been received.
{cart.map((item)=>(
<ul className="mt-3 space-y-2 rounded-lg bg-gray-50 p-3 sm:p-4">
  <li className="text-sm font-semibold text-gray-800">
    {item.product}
  </li>

  <li className="flex justify-between gap-4 text-sm text-gray-600">
    <span>Price:</span>
    <span className="font-medium text-gray-800">
      {formatPrice(item.price)}
    </span>
  </li>

  <li className="flex justify-between gap-4 text-sm text-gray-600">
    <span>Quantity:</span>
    <span className="font-medium text-gray-800">
      {item.quantity}
    </span>
  </li>
</ul>
))}
</p>
<span className="text-md font-medium ">Total: {totalResponse}</span>

</div>

</div>

);

}