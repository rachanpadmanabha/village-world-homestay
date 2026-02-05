import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EnhancedFeatureCard({ title, subtitle, icon: IconComponent, delay, description, features }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScrollStart = () => {
      console.log('🚀 Smooth scroll started - disabling hover effects');
      setIsScrolling(true);
      setIsHovered(false); // Close any expanded content
    };
    
    const handleScrollEnd = () => {
      console.log('✅ Smooth scroll ended - re-enabling hover effects');
      setIsScrolling(false);
    };

    window.addEventListener('smoothScrollStart', handleScrollStart);
    window.addEventListener('smoothScrollEnd', handleScrollEnd);

    return () => {
      window.removeEventListener('smoothScrollStart', handleScrollStart);
      window.removeEventListener('smoothScrollEnd', handleScrollEnd);
    };
  }, []);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: delay * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -12, rotateX: 5 }}
      onHoverStart={() => !isScrolling && setIsHovered(true)}
      onHoverEnd={() => !isScrolling && setIsHovered(false)}
    >
      {/* Main card */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-neutral-800/80 dark:to-neutral-900/60 backdrop-blur-xl border border-white/20 dark:border-neutral-700/20 shadow-xl overflow-hidden hover-lift">
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        {/* Professional icon with animation */}
        <motion.div 
          className="relative z-10 mb-6 inline-block"
          animate={(isHovered && !isScrolling) ? {
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1.05, 1.1, 1]
          } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <IconComponent className="w-8 h-8" />
          </div>
          
          {/* Glow effect behind icon */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30"
            style={{ 
              background: `radial-gradient(circle, ${
                title.includes('Nature') ? '#10b981' : 
                title.includes('Luxury') ? '#f59e0b' : 
                '#8b5cf6'
              }, transparent 70%)`
            }}
            animate={{ scale: (isHovered && !isScrolling) ? 1.5 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Title with gradient text */}
        <motion.h3 
          className="text-2xl font-bold mb-3 bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent"
          animate={(isHovered && !isScrolling) ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p 
          className="text-neutral-600 dark:text-neutral-400 mb-4"
          animate={(isHovered && !isScrolling) ? { x: 5 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {subtitle}
        </motion.p>

        {/* Expandable description - disabled during scroll */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={(isHovered && !isScrolling) ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              {description || "Experience the perfect blend of comfort and luxury in our carefully curated environment."}
            </p>
            <ul className="text-xs text-neutral-500 dark:text-neutral-500 space-y-1">
              {(features || [
                "Premium quality amenities",
                "Personalized service",
                "Authentic local experiences"
              ]).map((feature, i) => (
                <motion.li 
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ x: -10, opacity: 0 }}
                  animate={(isHovered && !isScrolling) ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.span 
                    className="w-1 h-1 rounded-full bg-emerald-500"
                    animate={(isHovered && !isScrolling) ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: i * 0.1 }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-amber-400/20 opacity-0 group-hover:opacity-100"
          animate={(isHovered && !isScrolling) ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          } : { scale: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-4 left-4 w-4 h-4 border border-emerald-400/30 rotate-45 opacity-0 group-hover:opacity-100"
          animate={(isHovered && !isScrolling) ? { 
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1]
          } : { rotate: 45, scale: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Interactive corner accent */}
        <motion.div
          className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-full opacity-10 blur-xl"
          animate={isHovered ? { 
            scale: 1.5,
            opacity: 0.2
          } : { 
            scale: 1,
            opacity: 0.1
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-emerald-500/0 group-hover:border-emerald-500/20"
        animate={(isHovered && !isScrolling) ? {
          scale: [1, 1.02, 1],
          borderColor: ['rgba(16, 185, 129, 0)', 'rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0)']
        } : { scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      {/* Floating shadow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-amber-600/10 rounded-3xl blur-xl -z-10"
        animate={(isHovered && !isScrolling) ? { 
          scale: 1.1,
          opacity: 0.6,
          y: 8
        } : { 
          scale: 1,
          opacity: 0.3,
          y: 4
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
