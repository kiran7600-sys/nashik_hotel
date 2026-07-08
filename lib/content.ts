// ============================================================
// content.ts — Single source of truth for all website content
// Edit this file to update any text, images, or data on the site.
// ============================================================

export const siteInfo = {
  name: "The Terotale",
  tagline: "Pure vegetarian. Rooted in the earth.",
  description:
    "An eco-conscious, pure vegetarian fine-dining restaurant in Nashik, offering garden-to-table cuisine amid lush plantations and open-air seating.",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // used in wa.me links — replace with actual number
  email: "hello@theterotale.com",
  address: {
    street: "Dr. Babasaheb Ambedkar Rd",
    landmark: "Opposite City Center Mall, beside Lakshika Mangal Karyalay",
    area: "Forest Colony, Parijat Nagar",
    city: "Nashik",
    state: "Maharashtra",
    zip: "422002",
    country: "India",
    full: "Dr. Babasaheb Ambedkar Rd, opposite City Center Mall, beside Lakshika Mangal Karyalay, Forest Colony, Parijat Nagar, Nashik 422002",
  },
  coordinates: {
    lat: 19.9975,
    lng: 73.7898,
  },
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.5!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU5JzUxLjAiTiA3M8KwNDcnMjMuMyJF!5e0!3m2!1sen!2sin!4v1700000000000",
  hours: [
    { day: "Monday – Friday", time: "12:00 PM – 11:00 PM" },
    { day: "Saturday – Sunday", time: "11:00 AM – 11:30 PM" },
  ],
  social: {
    instagram: "https://instagram.com/theterotale",
    facebook: "https://facebook.com/theterotale",
    tripadvisor: "https://tripadvisor.com",
    google: "https://g.page/theterotale",
  },
} as const;

export const hero = {
  image: "/images/hero-background.png",
  alt: "The Terotale garden restaurant at golden hour with lush plantations and warm fairy lights",
  heading: "The Terotale",
  subheading: "Pure vegetarian. Rooted in the earth.",
  scrollPrompt: "Discover our story",
} as const;

export const ecoStory = {
  sectionTitle: "Our Story",
  image: "/images/eco-story.png",
  alt: "Plant-filled interior of The Terotale with natural light streaming through windows",
  caption: "ABOVE: The plant-filled interior where nature meets fine dining",
  heading: "Eco-conscious dining, rooted in intention",
  paragraphs: [
    "At The Terotale, we believe that exceptional food begins with respect — for the earth, for the ingredients it offers, and for the people we share it with. Every dish on our menu is 100% vegetarian, crafted from locally sourced produce and seasonal harvests from Maharashtra's fertile farmlands.",
    "Our two-story restaurant sits within a living garden — open-air seating on the ground floor beneath a canopy of plantations, and a partially covered first floor that brings the outdoors in. We've eliminated single-use plastics, compost our kitchen waste, and power our EV charging stations with renewable energy.",
    "This isn't a trend for us. It's how we've always been.",
  ],
} as const;

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  cuisine: "Indian" | "Continental" | "Chinese";
};

export const menuHighlights: Dish[] = [
  // Indian
  {
    id: "paneer-tikka",
    name: "Tandoori Paneer Tikka",
    description:
      "Charcoal-kissed cottage cheese with smoked bell peppers and our signature green chutney",
    price: 395,
    image: "/images/dish-paneer-tikka.png",
    alt: "Tandoori paneer tikka plated on a dark ceramic dish",
    cuisine: "Indian",
  },
  {
    id: "dal-makhani",
    name: "Slow-cooked Dal Makhani",
    description:
      "Black lentils simmered overnight with cream, butter, and a whisper of fenugreek",
    price: 345,
    image: "/images/dish-dal-makhani.png",
    alt: "Rich dal makhani served in a copper bowl",
    cuisine: "Indian",
  },
  {
    id: "veg-biryani",
    name: "Nashik Garden Biryani",
    description:
      "Fragrant basmati layered with seasonal vegetables, saffron, and caramelised onions",
    price: 425,
    image: "/images/dish-veg-biryani.png",
    alt: "Vegetable biryani in an ornate copper handi",
    cuisine: "Indian",
  },
  // Continental
  {
    id: "truffle-risotto",
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy arborio rice with wild forest mushrooms, shaved truffle, and aged parmesan",
    price: 545,
    image: "/images/dish-truffle-risotto.png",
    alt: "Truffle mushroom risotto on a white ceramic plate",
    cuisine: "Continental",
  },
  {
    id: "bruschetta",
    name: "Heirloom Tomato Bruschetta",
    description:
      "Toasted sourdough with roasted heirloom tomatoes, burrata, and aged balsamic reduction",
    price: 375,
    image: "/images/dish-bruschetta.png",
    alt: "Bruschetta trio on a slate board",
    cuisine: "Continental",
  },
  {
    id: "pasta-primavera",
    name: "Pasta Primavera",
    description:
      "Fresh pappardelle tossed with seasonal roasted vegetables in a light cream herb sauce",
    price: 465,
    image: "/images/dish-pasta-primavera.png",
    alt: "Pasta primavera in a wide shallow bowl",
    cuisine: "Continental",
  },
  // Chinese
  {
    id: "chili-paneer",
    name: "Szechuan Chili Paneer",
    description:
      "Crispy paneer wok-tossed with peppers, spring onions, and fiery Szechuan peppercorns",
    price: 385,
    image: "/images/dish-chili-paneer.png",
    alt: "Szechuan chili paneer on a dark ceramic plate",
    cuisine: "Chinese",
  },
  {
    id: "dim-sum",
    name: "Truffle Edamame Dim Sum",
    description:
      "Hand-folded crystal dumplings with truffle-scented edamame and water chestnut filling",
    price: 445,
    image: "/images/dish-dim-sum.png",
    alt: "Vegetarian dim sum in bamboo steamer baskets",
    cuisine: "Chinese",
  },
  {
    id: "thai-curry",
    name: "Thai Green Curry",
    description:
      "Coconut milk curry with tofu, Thai basil, baby corn, and fresh kaffir lime leaves",
    price: 415,
    image: "/images/dish-thai-curry.png",
    alt: "Thai green curry in a dark ceramic bowl",
    cuisine: "Chinese",
  },
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  floor: "ground" | "first";
};

export const ambienceGallery: GalleryImage[] = [
  {
    id: "garden-dining",
    src: "/images/gallery-garden-dining.png",
    alt: "Open-air garden dining area with fairy lights at The Terotale",
    caption: "Garden dining beneath fairy lights and the open Nashik sky",
    floor: "ground",
  },
  {
    id: "indoor-cozy",
    src: "/images/gallery-indoor-cozy.png",
    alt: "Cozy indoor seating with exposed brick and climbing plants",
    caption: "The first-floor lounge — exposed brick meets trailing ivy",
    floor: "first",
  },
  {
    id: "terrace-view",
    src: "/images/gallery-terrace-view.png",
    alt: "Partially covered terrace with rattan furniture and hanging planters",
    caption: "Our partially covered terrace with a view of the garden below",
    floor: "first",
  },
  {
    id: "plantation-canopy",
    src: "/images/gallery-plantation-canopy.png",
    alt: "Garden pathway beneath a lush plantation canopy",
    caption: "The plantation walkway — a living corridor of ferns and lanterns",
    floor: "ground",
  },
  {
    id: "bar-area",
    src: "/images/gallery-bar-area.png",
    alt: "Elegant bar area with wooden shelving and indoor plants",
    caption: "Our bar — botanicals on the shelves, botanicals in the glass",
    floor: "ground",
  },
  {
    id: "private-corner",
    src: "/images/gallery-private-corner.png",
    alt: "Intimate private dining corner surrounded by greenery",
    caption: "A quiet corner — perfect for conversations that matter",
    floor: "first",
  },
];

export const trustData = {
  ratings: [
    {
      platform: "Restaurant Guru",
      score: "4.8",
      outOf: "5",
      reviewCount: "6,362+",
      icon: "star",
    },
    {
      platform: "Tripadvisor",
      score: "5.0",
      outOf: "5",
      reviewCount: "Excellent",
      icon: "tripadvisor",
    },
  ],
  quotes: [
    {
      text: "The most beautiful garden restaurant in Nashik. The food is as fresh and vibrant as the surroundings. Every visit feels like a mini getaway.",
      author: "Priya M.",
      source: "Google Reviews",
    },
    {
      text: "Finally, a place that takes vegetarian food seriously. The truffle risotto is world-class, and the ambience is unmatched in the city.",
      author: "Rahul K.",
      source: "Tripadvisor",
    },
    {
      text: "We celebrated our anniversary here — the open-air garden seating, the candlelight, the food. Absolutely magical evening. Already planning our next visit.",
      author: "Sneha & Amit D.",
      source: "Restaurant Guru",
    },
  ],
} as const;

export const reserveConfig = {
  heading: "Reserve a Table",
  subheading:
    "Choose your perfect evening, and we'll have a table waiting beneath the canopy.",
  timeSlots: [
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ],
  partySizes: [1, 2, 3, 4, 5, 6, 7, 8],
  messageTemplate: (name: string, date: string, time: string, partySize: number) =>
    `Hi, I'd like to reserve a table at The Terotale.\n\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${partySize}\n\nLooking forward to dining with you!`,
} as const;

export const visitInfo = {
  heading: "Visit Us",
  parking:
    "Ample parking available on premises, including dedicated EV charging stations for electric vehicles.",
  directions:
    "Located on Dr. Babasaheb Ambedkar Road, directly opposite City Center Mall. Look for us beside Lakshika Mangal Karyalay in Forest Colony.",
} as const;
