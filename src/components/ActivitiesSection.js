import React from 'react';
import { ACTIVITIES } from '../data';

export default function ActivitiesSection() {
  return (
    <section id="activities" className="container mx-auto px-6 py-12 reveal">
      <h2 className="text-3xl font-bold">Activities & Nearby</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <ul className="list-disc ml-6 text-neutral-700 dark:text-neutral-300">
          {ACTIVITIES.map((activity, i) => (
            <li key={i} className="mt-2">{activity}</li>
          ))}
        </ul>
        <div className="rounded-xl p-6 bg-white dark:bg-neutral-800 shadow">
          <h3 className="font-semibold">Top Nearby</h3>
          <ol className="mt-2 list-decimal ml-6 text-neutral-700 dark:text-neutral-300">
            <li>Abbey Falls — 30 mins</li>
            <li>Raja's Seat — 25 mins</li>
            <li>Namdroling Monastery — 40 mins</li>
            <li>Madikeri Market — 20 mins</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
