import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { SITE_CONFIG } from '../constants/site';
import { formatPrice } from '../utils/format';
import { orderService } from '../services';
import Breadcrumb from '../components/common/Breadcrumb';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
export default function Checkout() {
  const navigate = useNavigate();
  const { items, removeItem, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const subtotal = useCartStore((s) => s.getSubtotal());
  const tax = useCartStore((s) => s.getTax());
  const shipping = useCartStore((s) => s.getShipping());


  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const address=['mexico', 'bole', 'lideta']
  
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
const {token}= useContext(UserContext);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const infoResponse = await fetch(
  "http://localhost:8000/api/info/",
  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(form),
  }
);
const customer = await infoResponse.json();
console.log('guest_id:',customer);
if (!infoResponse.ok){
  toast.error('failed to send data');
  return;
}

    const response = await
fetch("http://localhost:8000/api/data/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({
        guest:customer.id,
        products: items.map((item) => ({
          product: item.productId,
          price: item.price,
          quantity: item.quantity,
      
        })),
      
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");

    }

    const data = await response.json();
console.log('response:', response)

    console.log("First response:", data);
    clearCart();
    navigate("/ordersuccess",{
      state:{
        guest_id:customer.id
      }
    });

  } catch (error) {
    console.error("Submission failed:", error);
  }
};


  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <Toaster position='top-right'/>
      <div className="px-4 md:px-8 lg:px-12 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Checkout' },
          ]}
        />

       
        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xs uppercase tracking-wider font-medium border-b border-platinum pb-3">
              Delivery Information
            </h2>
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <div>
            
              {address.map((choice)=>(

            
                <label key={choice} className="flex items-center gap-3">
                <input
        type="radio"
        name="address"
        value={choice}
        checked={form.address === choice}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
        required
      />
      <span className='capitalize'>
        {choice}
      </span>
      </label>
     
      ))}
           
            </div>
          <Button
  type="submit"
  size="lg"
  disabled={submitting}
  className="w-full"
>
  {submitting ? "Processing..." : "Place Order"}
</Button>
          </form>
  
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-medium border-b border-platinum pb-3">
              Order Summary
            </h2>
             {items.map((item) => (
              <div key={`${item.productId}-${item.selectedShape}`} className="flex gap-3 border-b border-platinum pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-platinum" loading="lazy" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                    {item.selectedShape && <p className="text-xs text-muted-foreground">{item.selectedShape}</p>}
                  <p className="text-sm">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decrementQuantity(item.productId, item.selectedShape)} className="p-1 border border-obsidian" aria-label="Decrease quantity">
                      <Minus size={10} />
                    </button>
                    <span className="text-sm min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.productId, item.selectedShape)} className="p-1 border border-obsidian" aria-label="Increase quantity">
                      <Plus size={10} />
                    </button>
                    <button onClick={() => removeItem(item.productId, item.selectedShape)} className="ml-auto p-1 text-muted-foreground hover:text-destructive" aria-label="Remove item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                       </div>
            ))}

           
          </div>
        </div>
      </div>
  </div>
  );
}