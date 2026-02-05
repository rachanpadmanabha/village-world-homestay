import React from 'react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="container mx-auto px-6 py-12 reveal">
      <h2 className="text-3xl font-bold">Guests Say</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, i) => (
          <blockquote key={i} className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow reveal">
            <p className="italic">"{testimonial.text}"</p>
            <footer className="mt-4 font-semibold">
              — {testimonial.name}, <span className="font-normal text-sm">{testimonial.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
