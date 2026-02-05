import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROOMS } from '../data';

export default function RoomsSection() {
  const [selected, setSelected] = useState(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="rooms" className="container mx-auto px-6 py-16 reveal">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
          Rooms & Amenities
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Elegant rooms inspired by Kodava traditions and modern taste.
        </p>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-3 gap-8 lg:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {ROOMS.map((r, index) => (
          <motion.article 
            key={r.id} 
            variants={itemVariants}
            className="group relative rounded-2xl overflow-hidden bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-xl border border-white/20 dark:border-neutral-700/20"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative overflow-hidden">
              <motion.img 
                loading="lazy" 
                src={r.img} 
                alt={r.name} 
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Price badge */}
              <motion.div
                className="absolute left-4 bottom-4 bg-gradient-to-r from-emerald-600/90 to-amber-600/90 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {r.price}
              </motion.div>

              {/* Floating icons */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              </motion.div>
            </div>
            
            <div className="p-6">
              <motion.h3 
                className="text-xl font-bold mb-3 text-neutral-800 dark:text-neutral-100"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {r.name}
              </motion.h3>
              <motion.p 
                className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                {r.desc}
              </motion.p>
              
              <div className="flex items-center justify-between gap-3">
                <motion.button 
                  onClick={() => setSelected(r)} 
                  className="px-4 py-2 rounded-full border-2 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Details
                </motion.button>
                <motion.a 
                  href="tel:+919945616508" 
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-glow"
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call to Book
                </motion.a>
              </div>
            </div>

            {/* Decorative corner accent */}
            <motion.div
              className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-emerald-400 to-amber-400 rounded-full opacity-10 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: index * 0.5 
              }}
            />
          </motion.article>
        ))}
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div 
              className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 dark:border-neutral-700/20"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <motion.div 
                className="p-6 flex justify-between items-center border-b border-neutral-200/50 dark:border-neutral-700/50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent">
                  {selected.name}
                </h3>
                <motion.button 
                  onClick={() => setSelected(null)} 
                  className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </motion.div>
              
              {/* Image */}
              <motion.div 
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img 
                  loading="lazy" 
                  src={selected.img} 
                  alt={selected.name} 
                  className="w-full h-80 object-cover" 
                />
                
                {/* Price overlay */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-600/90 to-amber-600/90 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold text-lg shadow-lg"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {selected.price}
                </motion.div>
              </motion.div>
              
              {/* Content */}
              <div className="p-6">
                <motion.p 
                  className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selected.desc}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="font-semibold text-lg mb-4 text-neutral-800 dark:text-neutral-200">
                    Amenities & Features
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Premium linens & curated amenities",
                      "Ensuite bathrooms with hot water", 
                      "Private verandas & nature views",
                      "Complimentary Wi-Fi",
                      "Daily housekeeping service",
                      "Welcome refreshments"
                    ].map((amenity, i) => (
                      <motion.div
                        key={amenity}
                        className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500" />
                        {amenity}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Action buttons */}
                <motion.div 
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button 
                    onClick={() => setSelected(null)} 
                    className="px-6 py-3 rounded-full border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-300"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                  <motion.a 
                    href="tel:+919945616508" 
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover-glow text-center"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Call to Book
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
