import { useState } from "react";

export default function App(){
  const[cart, setCart]= useState([])
  const products= [
    {id:1, name:'phone', price: 1200},
    {id:2, name:'laptop', price: 3000},
    {id:3, name: 'tv', price: 4500}
  ]
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
  
  return(
    <>

     {
  products.map((item) => (
    <div className="items">
    <ul key={item.id}>
      <li>ITEM-NAME: {item.name}</li>
      <li>PRICE: {item.price}</li>
    </ul>
    <button onClick={()=>addToCart(item)}>add</button>
</div>
  ))
}
<h2>CART</h2>
   {cart.map((item) => (
        <div key={item.id}>
          <h3>ITEM: {item.name}</h3>
<p>TOTAL: {item.price}*{item.quantity}</p>

          <button
            onClick={() =>
              removeItem(item.id)
            }
          >
            Remove
          </button>
          <button onClick={()=>increaseQ(item.id)}>+</button>
          <button onClick={()=>decreaseQ(item.id)}>-</button>
         
        </div>
      

   )
    

)}

</>

  )}