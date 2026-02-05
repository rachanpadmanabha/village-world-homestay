import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { scrollToId } from '../utils';

export default function EnhancedHeroSection() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -150]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const springConfig = { stiffness: 150, damping: 25, restDelta: 0.001 };
  useSpring(useTransform(scrollY, [0, 300], [0, -50]), springConfig);

  useEffect(() => {
    // Check if mobile for video optimization
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.section
      ref={heroRef}
      id="top"
      className="relative h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      style={{ y: y1 }}
    >
      {/* Premium Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Conditional Video/Image Background */}
        {/* Premium Video Background - Now on ALL devices */}
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale }}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          poster="/images/coorg-landscape-misty-hills.jpeg"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
        >
          <source src="/463568_Drone_Landscape_Drone_Mountains_3840x2160.mp4" type="video/mp4" />
          {/* Fallback image if video fails */}
          <img 
            src="/images/coorg-landscape-misty-hills.jpeg" 
            alt="Village World Homestay landscape" 
            className="w-full h-full object-cover"
          />
        </motion.video>

        {/* Video Loading Indicator */}
        {!isMobile && !videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        
        {/* Minimal overlay for text readability only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Floating particles for extra premium feel */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -120, -30],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>


      {/* Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-30 flex items-center justify-center h-full"
        style={{ opacity, y: y2 }}
      >
        <div className="text-center text-white max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight">
              <motion.span 
                className="block text-white drop-shadow-2xl"
                style={{ 
                  textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)'
                }}
              >
                Village World Homestay
              </motion.span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="h-2 w-40 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 mx-auto mt-6 rounded-full shadow-lg shadow-amber-500/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-body text-2xl md:text-5xl font-light mb-10 text-white tracking-wide"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.7)' 
            }}
          >
            A Luxurious Retreat in Paradise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-body text-lg md:text-2xl text-white max-w-4xl mx-auto mb-14 leading-relaxed font-light"
            style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.6)' 
            }}
          >
            Wake up to coffee aromas, misty hills, and personalized Kodava hospitality. 
            A boutique homestay for travelers who seek quiet, comfort, and curated experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToId('contact')}
              className="btn-premium font-body text-lg px-10 py-5"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>

            <motion.button
              onClick={() => scrollToId('gallery')}
              className="group relative px-10 py-5 border-2 border-white/40 rounded-full text-white font-body font-semibold text-lg backdrop-blur-sm hover:border-white/80 transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Gallery
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ borderColor: ['rgba(255,255,255,0.5)', 'rgba(16,185,129,0.8)', 'rgba(255,255,255,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-white/70 text-sm mt-2 text-center">Scroll to explore</p>
      </motion.div>

      {/* Enhanced bottom wave */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        style={{ y: useTransform(scrollY, [0, 300], [0, 100]) }}
      >
        <svg 
          className="w-full h-20 text-amber-50 dark:text-neutral-900" 
          viewBox="0 0 1440 120" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill="currentColor"
            d="M0,64L48,64C96,64,192,64,288,53.3C384,43,480,21,576,16C672,11,768,21,864,42.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            animate={{ d: [
              "M0,64L48,64C96,64,192,64,288,53.3C384,43,480,21,576,16C672,11,768,21,864,42.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              "M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              "M0,64L48,64C96,64,192,64,288,53.3C384,43,480,21,576,16C672,11,768,21,864,42.7C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.section>
  );
}
