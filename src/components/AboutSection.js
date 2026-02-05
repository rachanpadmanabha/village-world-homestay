import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-6 py-12 reveal">
      <div className="md:flex gap-8 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">
            Nestled amid coffee plantations, Coorg Cottage is a lovingly restored homestay where family-run hospitality meets modern comfort. We craft experiences — plantation walks, Kodava meals, and mindful moments — for curious travelers.
          </p>
          <ul className="mt-4 list-disc ml-6 text-neutral-700 dark:text-neutral-300">
            <li>Authentic local cuisine</li>
            <li>Guided plantation & birdwatching</li>
            <li>Comfort-first interiors & warm service</li>
          </ul>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              loading="lazy" 
              alt="veranda and coffee" 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60" 
              className="w-full h-72 object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
