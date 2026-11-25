import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../constants/categories';
import AnimatedSection from '../../components/animations/AnimatedSection';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger)
export default function BrowseByCategory() {

  useEffect(()=>{
    const ctx= gsap.context(()=>{
      const item = gsap.utils.toArray('.category');
      gsap.to(item, {
        xPercent:-50,
        repeat:-1,
        ease:'none',
        duration:15,
      })
    });
    return()=>ctx.revert();
    
  }, [])
 

  return (
    <div className="py-16 border-t-4 bg-obsidian text-alabaster md:py-18">
      <div className="px-4 md:px-8 lg:px-12 pt-8 mb-12">
        <h2 className="font-heading text-3xl text-center md:text-4xl font-medium">Browse by Category</h2>
        <p className="text-sm text-center font-bold text-muted-foreground mt-2">Find your favorite pasta shape</p>
      </div>
      <div className="category grid grid-flow-col hide-scrollbar gap-12 ml-4 px-4 md:px-8 lg:px-12 pb-4">
        {CATEGORIES.map((cat, index) => (
           <div
            key={cat.id}
          
          >
          <Link
            key={cat.id}
            to={`/shop?category=${cat.slug}`}
            className="flex flex-col items-center min-w-[120px] md:min-w-[160px] group"
          >
            <div className="aspect-square h-[20rem] w-full bg-platinum mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <span className="text-md font-heading group-hover:text-gold transition-colors">
              {cat.name}
            </span>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}