import React from 'react';

export default function FeatureCard({ title, subtitle, emoji }) {
  return (
    <div className="p-6 rounded-xl shadow-lg card-glass reveal">
      <div className="text-4xl">{emoji}</div>
      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{subtitle}</p>
    </div>
  );
}
