import { useEffect, useRef, useState } from 'react';
import AnimatedSection from '../../components/animations/AnimatedSection';
import ProductGrid from '../../components/product/ProductGrid';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import axios from 'axios';

export default function BestSellers() {
  const[product, setProduct]=useState([]);
     useEffect(()=>{
  axios.get('http://localhost:8000/api/products/')
  .then((response)=>{
    setProduct(response.data)
  })
  .catch((error)=>{
    console.error(error);
  })
}, [])
  const bestSellers = product.filter((p) => p.best_seller);

  return (
    <div className="py-16 md:py-24 bg-obsidian text-alabaster">
      <div className="px-4 md:px-8 lg:px-12 mb-8" >
        <div>
          <h2 className="font-heading text-3xl text-center md:text-4xl font-medium">Best Sellers</h2>
          <p className="text-sm text-center font-bold text-muted-foreground mt-2 pb-10">Our most loved pasta varieties</p>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:grid grid-cols-4" >
        <ProductGrid products={bestSellers}  />
      </div>
    </div>
  );
}