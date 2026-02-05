import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Leaf, Bed, Backpack } from 'lucide-react';
import Header from './components/Header';
import EnhancedHeroSection from './components/EnhancedHeroSection';
import EnhancedFeatureCard from './components/EnhancedFeatureCard';
import AboutSection from './components/AboutSection';
// import RoomsSection from './components/RoomsSection'; // Removed as requested
import PremiumGallerySection from './components/PremiumGallerySection';
import EnhancedActivitiesSection from './components/EnhancedActivitiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/SmoothScrollProvider';

export default function App() {
  const [dark, setDark] = useState(() => {
    try { 
      return localStorage.getItem('homestay-dark') === 'true'; 
    } catch (e) { 
      return false; 
    }
  });
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark'); 
    else root.classList.remove('dark');
    localStorage.setItem('homestay-dark', dark);
  }, [dark]);

  useEffect(() => {
    // reveal observer with stagger by data-delay attribute
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          el.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.setProperty('--delay', `${(i % 6) * 80}ms`);
      io.observe(el);
    });
    
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // scroll-linked background movement and nav shadow
    const onScroll = () => {
      const sc = window.scrollY;
      document.documentElement.style.setProperty('--scroll', String(sc));
      setNavScrolled(sc > 20);

      // drive blob positions (CSS variables) for parallax feel
      const blobs = document.querySelectorAll('[data-blob]');
      blobs.forEach((b) => {
        const speed = parseFloat(b.getAttribute('data-speed') || '0.2');
        const base = parseFloat(b.getAttribute('data-base') || '0');
        const y = (sc * speed) % 1000;
        b.style.transform = `translate3d(0, ${base - y * 0.04}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featureData = [
    {
      title: "Nature Immersion",
      subtitle: "Coffee estates & misty mornings",
      icon: Leaf,
      description: "Immerse yourself in the pristine beauty of Coorg's coffee plantations and misty landscapes.",
      features: ["Guided plantation walks", "Bird watching tours", "Nature photography", "Sunrise viewpoints"]
    },
    {
      title: "Luxury & Comfort",
      subtitle: "Artisan linens, curated meals",
      icon: Bed,
      description: "Experience unparalleled comfort with our carefully curated amenities and personalized service.",
      features: ["Premium bedding", "Spa treatments", "Gourmet cuisine", "24/7 concierge"]
    },
    {
      title: "Local Experiences",
      subtitle: "Kodava cooking, treks & culture",
      icon: Backpack,
      description: "Discover authentic Kodava culture through immersive experiences and local traditions.",
      features: ["Cooking classes", "Cultural tours", "Adventure treks", "Local artisan visits"]
    }
  ];

  return (
    <SmoothScrollProvider>
          <motion.div
            className="font-body bg-gradient-to-b from-slate-50 via-purple-50/30 to-blue-50/50 dark:from-neutral-950 dark:via-slate-900 dark:to-indigo-950 text-slate-900 dark:text-slate-100 min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Visible Background Animations */}
            <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
              {/* Large colorful blobs */}
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
                style={{ 
                  top: '0%', 
                  left: '-20%',
                  background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(219, 39, 119, 0.08) 70%, transparent 100%)',
                  filter: 'blur(80px)'
                }}
                animate={{
                  x: [0, 400, 0],
                  y: [0, -200, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
                style={{ 
                  top: '50%', 
                  right: '-15%',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.06) 70%, transparent 100%)',
                  filter: 'blur(80px)'
                }}
                animate={{
                  x: [0, -300, 0],
                  y: [0, 150, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
                style={{ 
                  bottom: '10%', 
                  left: '10%',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 70%, transparent 100%)',
                  filter: 'blur(60px)'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.4, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Visible geometric shapes */}
              <motion.div
                className="absolute w-40 h-40 border-2 border-purple-400/30 rounded-full"
                style={{ top: '20%', right: '15%' }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl"
                style={{ top: '75%', left: '80%' }}
                animate={{
                  rotate: [0, 360],
                  y: [0, -80, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute w-20 h-20 border-2 border-pink-400/25 rotate-45"
                style={{ top: '40%', left: '5%' }}
                animate={{
                  rotate: [45, 405],
                  scale: [1, 1.4, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* More visible floating particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${
                    i % 4 === 0 ? 'w-4 h-4 bg-purple-400/60' :
                    i % 4 === 1 ? 'w-3 h-3 bg-blue-400/50' :
                    i % 4 === 2 ? 'w-2 h-2 bg-pink-400/70' :
                    'w-1 h-1 bg-indigo-400/80'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-50, -300, -50],
                    opacity: [0, 1, 0],
                    scale: [0.3, 1.8, 0.3],
                  }}
                  transition={{
                    duration: 12 + Math.random() * 8,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Header with enhanced animations */}
            <motion.div
              className="relative z-20"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Header dark={dark} setDark={setDark} scrolled={navScrolled} />
            </motion.div>

            <main className="relative z-10">
              {/* Enhanced Hero Section */}
              <EnhancedHeroSection />

              {/* Enhanced Features Section */}
              <section id="highlights" className="container mx-auto px-6 py-24">
                <div className="text-center mb-20">
                  <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                    Why Choose Village World Homestay
                  </h2>
                  <div className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mx-auto rounded-full shadow-lg shadow-purple-500/30" />
                  <p className="font-body text-lg text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
                    Discover what makes our homestay an extraordinary experience
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                  {featureData.map((feature, i) => (
                    <EnhancedFeatureCard 
                      key={feature.title}
                      title={feature.title}
                      subtitle={feature.subtitle}
                      icon={feature.icon}
                      description={feature.description}
                      features={feature.features}
                      delay={i}
                    />
                  ))}
                </div>
              </section>

              {/* Premium Gallery with your authentic photos */}
              <PremiumGallerySection />
              
              {/* Other sections */}
              <AboutSection />
              <EnhancedActivitiesSection />
              <TestimonialsSection />
              <ContactSection />
            </main>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Footer />
            </motion.div>

            {/* Enhanced scroll to top button */}
            <motion.button
              className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl text-white shadow-2xl z-[50] flex items-center justify-center backdrop-blur-sm border border-white/20"
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: navScrolled ? 1 : 0, 
                opacity: navScrolled ? 1 : 0,
                rotate: navScrolled ? 0 : -180
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ArrowUp className="w-7 h-7" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        </SmoothScrollProvider>
  );
}
