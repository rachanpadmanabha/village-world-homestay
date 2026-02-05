import React from 'react';

export default function SmoothScrollProvider({ children }) {
  // Temporarily disable smooth scrolling to fix scroll issues
  return (
    <div className="smooth-scroll-container">
      {children}
    </div>
  );
}
