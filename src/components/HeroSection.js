import React, { useRef, useEffect } from 'react';
import { scrollToId } from '../utils';

export default function HeroSection() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const h = heroRef.current;
    if (!h) return;
    
    const onMove = () => {
      const sc = window.scrollY;
      // gentle scale/translate for parallax
      h.style.transform = `translateY(${sc * 0.06}px) scale(${1 - Math.min(sc / 15000, 0.03)})`;
    };
    
    window.addEventListener('scroll', onMove, { passive: true });
    return () => window.removeEventListener('scroll', onMove);
  }, []);

  return (
    <section id="top" className="relative h-[78vh] md:h-[86vh] overflow-hidden">
      <div 
        ref={heroRef} 
        className="hero-bg absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(7,10,9,0.12), rgba(3,6,4,0.12)), url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=60)` 
        }} 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25 mix-blend-multiply" />

      <div className="container mx-auto px-6 relative z-20 flex items-center h-full">
        <div className="max-w-3xl text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Coorg Cottage — A Luxurious Retreat
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
            Wake up to coffee aromas, misty hills, and personalized Kodava hospitality. A boutique homestay for travelers who seek quiet, comfort, and curated experiences.
          </p>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => scrollToId('contact')} 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 shadow-lg text-white transform hover:-translate-y-0.5 transition"
            >
              Contact Me
            </button>
            <button 
              onClick={() => scrollToId('gallery')} 
              className="px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white"
            >
              Explore Gallery
            </button>
          </div>
        </div>
      </div>

      {/* bottom wave */}
      <svg className="absolute bottom-0 left-0 w-full section-wave" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
        <path fill="rgba(255,255,255,0.85)" d="M0,64L48,64C96,64,192,64,288,53.3C384,43,480,21,576,16C672,11,768,21,864,42.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
    </section>
  );
}
