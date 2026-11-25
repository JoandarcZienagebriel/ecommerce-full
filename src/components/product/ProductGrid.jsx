import { motion } from 'framer-motion';
import ProductCard from '../../components/product/ProductCard';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)
export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">No products found.</p>
      </div>
    );
  }
const bestseller = useRef(null);
  useEffect(()=>{
    const el = bestseller.current;
const animation = gsap.to( el,{
  x:-100,
  duration:0.4,
  ease:'power2.in',
  scrollTrigger:{
    trigger:el,
    scrub:1,
    start:'top 80%',
    end: '+=500',
  }

});
return ()=>{
  animation.kill;
}
  })
  return (
    <div className="flex gap-6 pb-4 snap-x lg:gap-12" ref={bestseller}>
      {products.map((product, index) => (
        <div key={product.id} className="snap-start">
          <ProductCard product={product} index={index} />
        </div>
      ))}
    </div>
  );
}