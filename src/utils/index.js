// Helper utility functions with scroll state management
let isScrolling = false;
let scrollTimeout = null;

// Global scroll state for components to check
export const getScrollState = () => isScrolling;

export const scrollToId = (id) => {
  console.log(`🎯 Navigation: Scrolling to ${id}`);
  const el = document.getElementById(id);
  if (el) {
    // Set scrolling state
    isScrolling = true;
    
    // Clear any existing timeout
    if (scrollTimeout) clearTimeout(scrollTimeout);
    
    // Dispatch custom event to notify components
    console.log('📡 Broadcasting smoothScrollStart event');
    window.dispatchEvent(new CustomEvent('smoothScrollStart'));
    
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Reset scrolling state after scroll completes
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      console.log('📡 Broadcasting smoothScrollEnd event');
      window.dispatchEvent(new CustomEvent('smoothScrollEnd'));
    }, 1000); // Assume scroll completes within 1 second
  }
};
