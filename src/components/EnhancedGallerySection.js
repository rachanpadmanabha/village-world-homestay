import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY } from '../data';

export default function EnhancedGallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [imagesLoaded, setImagesLoaded] = useState({});
  const galleryRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All Views', count: GALLERY.length },
    { id: 'exterior', name: 'Exterior', count: 6 },
    { id: 'rooms', name: 'Rooms', count: 4 },
    { id: 'landscape', name: 'Landscape', count: 8 }
  ];

  const getFilteredImages = () => {
    if (filter === 'all') return GALLERY;
    // Simple categorization based on index for demo
    switch (filter) {
      case 'exterior':
        return GALLERY.slice(0, 6);
      case 'rooms':
        return GALLERY.slice(6, 10);
      case 'landscape':
        return GALLERY.slice(10);
      default:
        return GALLERY;
    }
  };

  const filteredImages = getFilteredImages();

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % filteredImages.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + filteredImages.length) % filteredImages.length);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filteredImages.length]);

  const handleImageLoad = (src) => {
    setImagesLoaded(prev => ({ ...prev, [src]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
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
    <section id="gallery" className="container mx-auto px-6 py-16 reveal">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Gallery
        </motion.h2>
        <motion.p 
          className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover the breathtaking beauty of our homestay through these carefully curated moments
        </motion.p>
      </div>

      {/* Filter tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === category.id
                ? 'bg-gradient-to-r from-emerald-600 to-amber-500 text-white shadow-lg'
                : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name} ({category.count})
          </motion.button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        ref={galleryRef}
        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence mode="wait">
          {filteredImages.map((src, i) => (
            <motion.div
              key={`${filter}-${i}`}
              variants={itemVariants}
              layout
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => { setIndex(i); setOpen(true); }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                {/* Loading placeholder */}
                {!imagesLoaded[src] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-amber-100 animate-pulse" />
                )}
                
                <motion.img
                  loading="lazy"
                  src={`${src}&w=600&q=85`}
                  alt={`Coorg homestay view ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoad={() => handleImageLoad(src)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imagesLoaded[src] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      className="flex items-center justify-between text-white"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="text-sm font-medium">
                        View {i + 1} of {filteredImages.length}
                      </span>
                      <motion.div
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-2xl"
                  whileHover={{
                    borderColor: 'rgba(16, 185, 129, 0.5)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {/* Main image container */}
            <motion.div
              className="max-w-6xl w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  key={index}
                  loading="lazy"
                  src={filteredImages[index]}
                  alt={`Coorg homestay view ${index + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Navigation arrows */}
                <motion.button
                  onClick={() => setIndex(i => (i - 1 + filteredImages.length) % filteredImages.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={() => setIndex(i => (i + 1) % filteredImages.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Bottom info bar */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm">
                {index + 1} / {filteredImages.length}
              </span>
              <div className="w-px h-4 bg-white/30" />
              <span className="text-sm text-white/80">
                Use ← → keys to navigate • ESC to close
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
