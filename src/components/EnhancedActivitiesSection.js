import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Clock, Camera, Utensils, Mountain, Waves, TreePine, Store, Footprints } from 'lucide-react';
import { ACTIVITIES } from '../data';

export default function EnhancedActivitiesSection() {
  const nearbyPlaces = [
    { name: 'Abbey Falls', time: '30 mins', distance: '12 km', icon: Waves, description: 'Stunning waterfall surrounded by lush greenery' },
    { name: "Raja's Seat", time: '25 mins', distance: '8 km', icon: Camera, description: 'Spectacular sunset viewpoint and gardens' },
    { name: 'Namdroling Monastery', time: '40 mins', distance: '35 km', icon: Compass, description: 'Beautiful Tibetan Buddhist monastery' },
    { name: 'Madikeri Market', time: '20 mins', distance: '6 km', icon: Store, description: 'Local spices, coffee, and handicrafts' },
    { name: 'Mandalpatti Viewpoint', time: '45 mins', distance: '28 km', icon: Mountain, description: 'Breathtaking valley views and trekking' },
    { name: 'Dubare Elephant Camp', time: '50 mins', distance: '32 km', icon: TreePine, description: 'Elephant interaction and river activities' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
    <section id="activities" className="relative py-20 bg-gradient-to-b from-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:to-indigo-950/50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          style={{ top: '10%', left: '5%' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          style={{ bottom: '20%', right: '10%' }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
            Activities & Experiences
          </h2>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mx-auto rounded-full shadow-lg shadow-purple-500/30 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="font-body text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in authentic Coorg experiences and explore the stunning attractions nearby
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Activities at Homestay */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                Experiences at Our Homestay
              </h3>
              <p className="font-body text-slate-600 dark:text-slate-400 text-lg">
                Curated activities designed to connect you with local culture and nature
              </p>
            </div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {ACTIVITIES.map((activity, i) => {
                const IconComponent = getActivityIcon(activity);
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group flex items-start gap-4 p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-purple-100/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10"
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                        {activity}
                      </h4>
                      <p className="font-body text-sm text-slate-600 dark:text-slate-400">
                        {getActivityDescription(activity)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Nearby Attractions */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                Must-Visit Nearby
              </h3>
              <p className="font-body text-slate-600 dark:text-slate-400 text-lg">
                Discover the best attractions within easy reach of our homestay
              </p>
            </div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {nearbyPlaces.map((place, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/70 to-purple-50/50 dark:from-slate-800/70 dark:to-slate-700/50 backdrop-blur-sm border border-purple-100/50 dark:border-slate-600/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden"
                  whileHover={{ x: -8, scale: 1.02 }}
                >
                  {/* Background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <place.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                          {place.name}
                        </h4>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full">
                            <Clock className="w-3 h-3" />
                            {place.time}
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-slate-600 dark:text-slate-400 mb-2">
                        {place.description}
                      </p>
                      <p className="font-body text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {place.distance} away
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-premium font-body text-lg px-10 py-4"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Your Stay
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Helper functions for activities
function getActivityDescription(activity) {
  const descriptions = {
    'Plantation & coffee-tasting tour': 'Learn about coffee cultivation and taste fresh brews',
    'Guided nature walks and birdwatching': 'Explore local flora and fauna with expert guides',
    'Kodava cooking class': 'Master traditional Coorg recipes with local ingredients',
    'Local market visits & pottery': 'Experience authentic local crafts and shopping',
    'Waterfall day trips and easy treks': 'Adventure to hidden waterfalls and scenic trails'
  };
  return descriptions[activity] || 'Authentic local experience curated for our guests';
}

function getActivityIcon(activity) {
  const icons = {
    'Plantation & coffee-tasting tour': TreePine,
    'Guided nature walks and birdwatching': Camera,
    'Kodava cooking class': Utensils,
    'Local market visits & pottery': Store,
    'Waterfall day trips and easy treks': Mountain
  };
  return icons[activity] || Compass;
}
