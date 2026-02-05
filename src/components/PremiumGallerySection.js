import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Image as ImageIcon } from 'lucide-react';
import { GALLERY_PHOTOS, GALLERY_CATEGORIES } from '../data';

// Test if photos are loading
console.log('GALLERY_PHOTOS import test:', GALLERY_PHOTOS);
console.log('GALLERY_CATEGORIES import test:', GALLERY_CATEGORIES);

export default function PremiumGallerySection() {
  const [filter, setFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPhotos = filter === 'all' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(photo => photo.category === filter);

  // Debug logging
  console.log('Current filter:', filter);
  console.log('Filtered photos count:', filteredPhotos.length);
  console.log('GALLERY_PHOTOS:', GALLERY_PHOTOS.length);

  // Functions defined before useEffect
  const closePhoto = () => {
    console.log('Closing photo');
    setSelectedPhoto(null);
    setCurrentIndex(0);
  };

  const openPhoto = (photo) => {
    console.log('Opening photo:', photo.title, photo.id);
    const index = filteredPhotos.findIndex(p => p.id === photo.id);
    console.log('Photo index:', index);
    setCurrentIndex(index);
    setSelectedPhoto(photo);
  };

  // Add click-outside-to-close functionality
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('Background clicked - closing lightbox');
      closePhoto();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedPhoto) return;
      
      console.log('Key pressed:', e.key);
      
      if (e.key === 'ArrowRight') {
        const newIndex = (currentIndex + 1) % filteredPhotos.length;
        setCurrentIndex(newIndex);
        setSelectedPhoto(filteredPhotos[newIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        setCurrentIndex(newIndex);
        setSelectedPhoto(filteredPhotos[newIndex]);
      }
      if (e.key === 'Escape') {
        console.log('ESC pressed - closing lightbox');
        closePhoto();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, currentIndex, filteredPhotos]);


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
    hidden: { opacity: 0, y: 30, scale: 0.8 },
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
    <section id="gallery" className="relative py-20 bg-gradient-to-b from-white to-purple-50/30 dark:from-neutral-900 dark:to-indigo-950/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
            Photo Gallery
          </h2>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mx-auto rounded-full shadow-lg shadow-purple-500/30 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="font-body text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Explore the breathtaking beauty of our homestay through these authentic moments captured at Village World Homestay
          </p>
        </motion.div>

        {/* Enhanced Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {GALLERY_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`group relative px-6 py-3 rounded-2xl font-body font-semibold text-sm transition-all duration-500 overflow-hidden ${
                filter === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-purple-200/50 dark:border-slate-600'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {category.name} ({category.count})
              </span>
              {filter !== category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos && filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <motion.div
                key={`${photo.id}-${filter}`}
                className="group relative cursor-pointer"
                onClick={() => openPhoto(photo)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-slate-800 dark:to-slate-700">
                  {/* Main Image */}
                  <motion.img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Content Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="text-white">
                      <h3 className="font-display text-lg font-semibold mb-1">{photo.title}</h3>
                      <p className="font-body text-sm text-white/80 capitalize">{photo.category.replace('-', ' ')}</p>
                    </div>
                  </motion.div>

                  {/* Zoom Icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ZoomIn className="w-5 h-5 text-white" />
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold opacity-0 group-hover:opacity-100"
                    initial={{ x: -20, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {photo.category.replace('-', ' ')}
                  </motion.div>

                  {/* Border Animation */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-3xl"
                    whileHover={{
                      borderColor: 'rgba(139, 92, 246, 0.5)',
                      boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No photos found for {filter === 'all' ? 'gallery' : filter} category
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Filter: {filter} | Total photos: {GALLERY_PHOTOS ? GALLERY_PHOTOS.length : 0}
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-body text-slate-500 dark:text-slate-400">
            Showing {filteredPhotos.length} of {GALLERY_PHOTOS.length} photos
          </p>
        </motion.div>
      </div>

      {/* Enhanced Responsive Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackgroundClick}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg z-[60]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                console.log('Close button clicked'); 
                closePhoto(); 
              }}
              type="button"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Main Content Container */}
            <div className="h-full flex flex-col">
              {/* Image Container */}
              <motion.div
                className="flex-1 flex items-center justify-center p-4 md:p-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Main Image */}
                  <motion.img
                    key={selectedPhoto.id}
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="max-w-full max-h-full object-contain rounded-xl md:rounded-2xl shadow-2xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Navigation Arrows - Desktop */}
                  {filteredPhotos.length > 1 && (
                    <>
                      <motion.button
                        className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1, x: -3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
                          setCurrentIndex(newIndex);
                          setSelectedPhoto(filteredPhotos[newIndex]);
                        }}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>

                      <motion.button
                        className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1, x: 3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIndex = (currentIndex + 1) % filteredPhotos.length;
                          setCurrentIndex(newIndex);
                          setSelectedPhoto(filteredPhotos[newIndex]);
                        }}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Bottom Info Panel */}
              <motion.div
                className="bg-black/80 backdrop-blur-xl border-t border-white/10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Mobile Navigation */}
                {filteredPhotos.length > 1 && (
                  <div className="md:hidden flex justify-center items-center gap-4 px-6 py-4 border-b border-white/10">
                    <motion.button
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
                        setCurrentIndex(newIndex);
                        setSelectedPhoto(filteredPhotos[newIndex]);
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <span className="text-white font-semibold px-4 py-2 bg-white/10 rounded-full">
                      {currentIndex + 1} / {filteredPhotos.length}
                    </span>
                    
                    <motion.button
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newIndex = (currentIndex + 1) % filteredPhotos.length;
                        setCurrentIndex(newIndex);
                        setSelectedPhoto(filteredPhotos[newIndex]);
                      }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}

                {/* Photo Info */}
                <div className="px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Photo Details */}
                    <div className="text-white">
                      <h3 className="font-display text-xl md:text-2xl font-semibold mb-1">{selectedPhoto.title}</h3>
                      <p className="font-body text-sm md:text-base text-white/70 capitalize">
                        {selectedPhoto.category.replace('-', ' ')}
                      </p>
                    </div>

                    {/* Desktop Counter & Instructions */}
                    <div className="hidden md:flex items-center gap-6 text-white/80">
                      <div className="text-center">
                        <p className="font-body text-sm">Photo</p>
                        <p className="font-semibold text-lg">{currentIndex + 1} of {filteredPhotos.length}</p>
                      </div>
                      <div className="w-px h-8 bg-white/30" />
                      <div className="text-center">
                        <p className="font-body text-xs">Use ← → keys or click arrows</p>
                        <p className="font-body text-xs">ESC to close</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails - Desktop Only */}
                {filteredPhotos.length > 1 && (
                  <motion.div
                    className="hidden md:block px-6 pb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-center gap-2 max-w-4xl mx-auto overflow-x-auto pb-2">
                      {filteredPhotos.map((photo, index) => (
                        <motion.button
                          key={photo.id}
                          className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            index === currentIndex 
                              ? 'border-purple-400 scale-105 shadow-lg shadow-purple-400/50' 
                              : 'border-white/20 hover:border-white/50'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(index);
                            setSelectedPhoto(photo);
                          }}
                          whileHover={{ scale: index === currentIndex ? 1.05 : 1.02 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
