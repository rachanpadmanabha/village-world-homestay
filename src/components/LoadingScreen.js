import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        onComplete: () => {
          setTimeout(onComplete, 500);
        }
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-900 flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-amber-600/20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(16,185,129,0.2) 0%, rgba(245,158,11,0.2) 100%)',
              'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(16,185,129,0.2) 100%)',
              'linear-gradient(225deg, rgba(16,185,129,0.2) 0%, rgba(245,158,11,0.2) 100%)',
              'linear-gradient(315deg, rgba(245,158,11,0.2) 0%, rgba(16,185,129,0.2) 100%)',
              'linear-gradient(45deg, rgba(16,185,129,0.2) 0%, rgba(245,158,11,0.2) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating elements */}
        <motion.div
          className="absolute w-32 h-32 border border-white/20 rounded-full"
          style={{ top: '20%', left: '10%' }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"
          style={{ bottom: '20%', right: '15%' }}
          animate={{
            rotate: -360,
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center text-white">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-400 flex items-center justify-center text-4xl font-extrabold text-white shadow-2xl mb-6">
            C
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-white via-emerald-200 to-amber-200 bg-clip-text text-transparent">
            Coorg Cottage
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-emerald-100 mb-12"
        >
          Luxury Homestay Experience
        </motion.p>

        {/* Progress bar */}
        <motion.div
          variants={itemVariants}
          className="w-64 h-1 bg-white/20 rounded-full mx-auto mb-8 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 origin-left"
            variants={progressVariants}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          variants={itemVariants}
          className="text-sm text-white/80"
        >
          <span className="loading-dots">Preparing your journey</span>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
