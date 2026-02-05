export const ROOMS = [
  {
    id: "deluxe",
    name: "Deluxe Cottage",
    price: "From ₹6,500",
    desc: "Valley-facing private cottage with king bed, ensuite, and veranda.",
    img: "https://images.unsplash.com/photo-1505691723518-36a2b1b1a2a1?auto=format&fit=crop&w=1600&q=60",
  },
  {
    id: "garden",
    name: "Garden Suite",
    price: "From ₹4,200",
    desc: "Spacious room opening to the garden — ideal for couples.",
    img: "https://images.unsplash.com/photo-1501117716987-c8e3c9a1c85f?auto=format&fit=crop&w=1600&q=60",
  },
  {
    id: "heritage",
    name: "Heritage Room",
    price: "From ₹5,200",
    desc: "Traditional Kodava decor blended with modern comforts.",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=60",
  },
];

// Gallery with local photos and categories
export const GALLERY_PHOTOS = [
  {
    id: "exterior-cottage",
    src: "/images/coorg-exterior-cottage.jpeg",
    alt: "Village World Homestay exterior view",
    category: "interior",
    title: "Cottage Interior",
  },
  {
    id: "room-deluxe",
    src: "/images/coorg-room-deluxe.jpeg",
    alt: "Deluxe room interior",
    category: "rooms",
    title: "Deluxe Room",
  },
  {
    id: "landscape-misty",
    src: "/images/coorg-landscape-misty-hills.jpeg",
    alt: "Misty hills landscape view",
    category: "interior",
    title: "Cupboards and bathrooms",
  },
  {
    id: "living-room",
    src: "/images/coorg-interior-living-room.jpeg",
    alt: "Living room interior",
    category: "interior",
    title: "Living Area",
  },
  {
    id: "plantation",
    src: "/images/coorg-plantation-view.jpeg",
    alt: "Coffee plantation view",
    category: "interior",
    title: "Living Area",
  },
  {
    id: "veranda",
    src: "/images/coorg-veranda-morning.jpeg",
    alt: "Morning veranda view",
    category: "exterior",
    title: "Morning Veranda",
  },
  {
    id: "bedroom-heritage",
    src: "/images/coorg-bedroom-heritage.jpeg",
    alt: "Heritage bedroom",
    category: "exterior",
    title: "Room Outside",
  },
  {
    id: "room-deluxe",
    src: "/images/coorg-room-deluxe.jpeg",
    alt: "Deluxe room interior",
    category: "rooms",
    title: "Deluxe Room",
  },
  {
    id: "sunset-view",
    src: "/images/coorg-sunset-view.jpeg",
    alt: "Sunset view from cottage",
    category: "landscape",
    title: "Sunset Vista",
  },

  {
    id: "bathroom-luxury",
    src: "/images/coorg-bathroom-luxury.jpeg",
    alt: "Luxury bathroom",
    category: "rooms",
    title: "Luxury Bathroom",
  },
  {
    id: "balcony-view",
    src: "/images/coorg-balcony-view.jpeg",
    alt: "Balcony with view",
    category: "exterior",
    title: "Campfire",
  },
  {
    id: "entrance",
    src: "/images/coorg-entrance-cottage.jpeg",
    alt: "Cottage entrance",
    category: "exterior",
    title: "Main Entrance",
  },
  {
    id: "forest-trail",
    src: "/images/coorg-forest-trail.jpeg",
    alt: "Forest trail nearby",
    category: "landscape",
    title: "Outside look",
  },
  {
    id: "valley-panorama",
    src: "/images/coorg-valley-panorama.jpeg",
    alt: "Valley panoramic view",
    category: "landscape",
    title: "Valley Panorama",
  },
  {
    id: "garden-suite",
    src: "/images/coorg-room-garden-suite.jpeg",
    alt: "Garden suite room",
    category: "rooms",
    title: "Bathroom",
  },

  {
    id: "hills-landscape",
    src: "/images/coorg-hills-landscape.jpeg",
    alt: "Hills landscape",
    category: "landscape",
    title: "Hills Vista",
  },
  {
    id: "outdoor-seating",
    src: "/images/coorg-outdoor-seating.jpeg",
    alt: "Outdoor seating area",
    category: "exterior",
    title: "Outdoor Seating",
  },
  {
    id: "nature-closeup",
    src: "/images/coorg-nature-close-up.jpeg",
    alt: "Nature close-up",
    category: "landscape",
    title: "Outside Details",
  },
];

// For backward compatibility
export const GALLERY = GALLERY_PHOTOS.map((photo) => photo.src);

// Gallery categories
export const GALLERY_CATEGORIES = [
  { id: "all", name: "All Photos", count: GALLERY_PHOTOS.length },
  {
    id: "exterior",
    name: "Exterior Views",
    count: GALLERY_PHOTOS.filter((p) => p.category === "exterior").length,
  },
  {
    id: "rooms",
    name: "Rooms & Suites",
    count: GALLERY_PHOTOS.filter((p) => p.category === "rooms").length,
  },
  {
    id: "interior",
    name: "Interior Spaces",
    count: GALLERY_PHOTOS.filter((p) => p.category === "interior").length,
  },
  {
    id: "landscape",
    name: "Landscape & Nature",
    count: GALLERY_PHOTOS.filter((p) => p.category === "landscape").length,
  },
];

export const TESTIMONIALS = [
  {
    name: "Sonia",
    place: "Bengaluru",
    text: "A perfect serene getaway — the views and hospitality were outstanding.",
  },
  {
    name: "Arjun",
    place: "Mumbai",
    text: "Beautiful property, great food, and excellent local experiences arranged by the hosts.",
  },
  {
    name: "Lily",
    place: "Chennai",
    text: "Cozy rooms and perfect for a digital detox. We loved the plantation walks.",
  },
];

export const ACTIVITIES = [
  "Plantation & coffee-tasting tour",
  "Guided nature walks and birdwatching",
  "Kodava cooking class",
  "Local market visits & pottery",
  "Waterfall day trips and easy treks",
];
