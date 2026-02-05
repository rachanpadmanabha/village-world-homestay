import React, { useState, useEffect } from 'react';
import { GALLERY } from '../data';

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + GALLERY.length) % GALLERY.length);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section id="gallery" className="container mx-auto px-6 py-12 reveal">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Click any photo to enlarge • use ← → to navigate</p>
      </div>

      <div className="mt-6 masonry">
        {GALLERY.map((src, i) => (
          <button 
            key={i} 
            onClick={() => { setIndex(i); setOpen(true); }} 
            className="w-full mb-4 overflow-hidden" 
            aria-label={`Open image ${i + 1}`}
          >
            <img loading="lazy" src={`${src}&w=1000&q=60`} alt={`Coorg homestay view ${i + 1}`} />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white text-2xl">✕</button>
          <div className="max-w-5xl w-full bg-black/80 p-4 rounded-lg lightbox-show">
            <img 
              loading="lazy" 
              src={GALLERY[index]} 
              alt={`Coorg homestay view ${index + 1}`} 
              className="w-full h-[70vh] object-contain rounded" 
            />
            <div className="mt-3 flex justify-between items-center text-white">
              <button 
                onClick={() => setIndex(i => (i - 1 + GALLERY.length) % GALLERY.length)} 
                className="px-3 py-2 bg-white/10 rounded"
              >
                Prev
              </button>
              <div>{index + 1} / {GALLERY.length}</div>
              <button 
                onClick={() => setIndex(i => (i + 1) % GALLERY.length)} 
                className="px-3 py-2 bg-white/10 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
