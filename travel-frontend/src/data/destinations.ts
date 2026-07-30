export interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description: "Experience the magic of white-washed buildings and stunning sunsets over the Aegean Sea.",
    price: 1299,
    duration: "7 Days",
    image: "/images/dest-santorini.jpg",
    rating: 4.9,
    reviews: 1284,
    category: "Beach"
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    description: "Discover the perfect blend of ancient traditions and cutting-edge technology in Japan's vibrant capital.",
    price: 1599,
    duration: "10 Days",
    image: "/images/dest-tokyo.jpg",
    rating: 4.8,
    reviews: 2156,
    category: "City"
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    description: "Immerse yourself in tropical paradise with lush rice terraces, ancient temples, and pristine beaches.",
    price: 999,
    duration: "8 Days",
    image: "/images/dest-bali.jpg",
    rating: 4.7,
    reviews: 1876,
    category: "Beach"
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    description: "Fall in love with the City of Light, where romance, art, and cuisine create unforgettable memories.",
    price: 1499,
    duration: "6 Days",
    image: "/images/dest-paris.jpg",
    rating: 4.9,
    reviews: 3421,
    category: "City"
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    description: "Experience luxury and innovation in this modern oasis where desert meets sky-high architecture.",
    price: 1799,
    duration: "5 Days",
    image: "/images/dest-dubai.jpg",
    rating: 4.6,
    reviews: 1654,
    category: "City"
  },
  {
    id: 6,
    name: "Maldives",
    country: "Maldives",
    description: "Escape to paradise with overwater bungalows and crystal-clear turquoise waters.",
    price: 2199,
    duration: "7 Days",
    image: "/images/dest-maldives.jpg",
    rating: 5.0,
    reviews: 892,
    category: "Beach"
  },
  {
    id: 7,
    name: "Swiss Alps",
    country: "Switzerland",
    description: "Breathtaking alpine landscapes, charming villages, and world-class skiing await in the heart of Europe.",
    price: 2499,
    duration: "8 Days",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=500&fit=crop",
    rating: 4.9,
    reviews: 1567,
    category: "Mountain"
  },
  {
    id: 8,
    name: "Rome",
    country: "Italy",
    description: "Walk through 2000 years of history, from the Colosseum to the Vatican, with world's finest cuisine.",
    price: 1399,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1552832230-0196e35e3e35?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 2340,
    category: "Heritage"
  },
  {
    id: 9,
    name: "New York",
    country: "USA",
    description: "The city that never sleeps — iconic skyline, Broadway shows, and endless urban adventures.",
    price: 1899,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 3102,
    category: "City"
  },
  {
    id: 10,
    name: "Phuket",
    country: "Thailand",
    description: "Tropical beaches, vibrant nightlife, and stunning limestone karsts rising from emerald waters.",
    price: 799,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1504214208698-4b525172711b?w=800&h=500&fit=crop",
    rating: 4.5,
    reviews: 1432,
    category: "Beach"
  },
  {
    id: 11,
    name: "Machu Picchu",
    country: "Peru",
    description: "Trek through the Andes to discover the lost city of the Incas — a true wonder of the world.",
    price: 2099,
    duration: "9 Days",
    image: "https://images.unsplash.com/photo-1587595430674-4ed89bb82e4e?w=800&h=500&fit=crop",
    rating: 4.9,
    reviews: 987,
    category: "Mountain"
  },
  {
    id: 12,
    name: "Sydney",
    country: "Australia",
    description: "Sun-kissed beaches, world-famous Opera House, and a vibrant harborside city with laid-back charm.",
    price: 2499,
    duration: "10 Days",
    image: "https://images.unsplash.com/photo-1508079583277-a9b2a3a75281?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 1456,
    category: "City"
  },
  {
    id: 13,
    name: "Cairo",
    country: "Egypt",
    description: "Stand in awe before the Great Pyramids and cruise the timeless Nile through ancient civilization.",
    price: 1199,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1553913861-e12e70655b4b?w=800&h=500&fit=crop",
    rating: 4.6,
    reviews: 876,
    category: "Heritage"
  },
  {
    id: 14,
    name: "Reykjavik",
    country: "Iceland",
    description: "Land of fire and ice — volcanoes, glaciers, Northern Lights, and geothermal hot springs.",
    price: 2299,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1476610182048-b89999e440ac?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 654,
    category: "Adventure"
  },
  {
    id: 15,
    name: "Jaipur",
    country: "India",
    description: "The Pink City of Rajasthan — majestic forts, vibrant bazaars, and royal heritage at every turn.",
    price: 599,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1477589035993-d4728efb5e75?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 1876,
    category: "Heritage"
  },
  {
    id: 16,
    name: "Goa",
    country: "India",
    description: "Golden beaches, Portuguese heritage, spice plantations, and the ultimate beach party paradise.",
    price: 499,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1514096628936-88c3f16db9a9?w=800&h=500&fit=crop",
    rating: 4.5,
    reviews: 2134,
    category: "Beach"
  },
  {
    id: 17,
    name: "Barcelona",
    country: "Spain",
    description: "Gaudi's architectural masterpieces, Mediterranean beaches, and world-famous tapas culture.",
    price: 1299,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1583422409518-7789b9b194a6?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 2234,
    category: "City"
  },
  {
    id: 18,
    name: "Venice",
    country: "Italy",
    description: "Glide through romantic canals, admire Renaissance art, and get lost in narrow cobblestone streets.",
    price: 1499,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1529154032299-db6a246bdee8?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 1789,
    category: "City"
  },
  {
    id: 19,
    name: "Bangkok",
    country: "Thailand",
    description: "Golden temples, floating markets, electrifying street food, and vibrant nightlife in Southeast Asia's hub.",
    price: 699,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=500&fit=crop",
    rating: 4.4,
    reviews: 2567,
    category: "City"
  },
  {
    id: 20,
    name: "Marrakech",
    country: "Morocco",
    description: "Lose yourself in labyrinthine souks, stunning riads, and the vibrant colors of North Africa.",
    price: 899,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1489749795064-f392ea326dab?w=800&h=500&fit=crop",
    rating: 4.6,
    reviews: 1123,
    category: "Heritage"
  },
  {
    id: 21,
    name: "Manali",
    country: "India",
    description: "Snow-capped peaks, pine forests, and adventure sports in the heart of the Himalayas.",
    price: 449,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1544735712685-67761c0db90d?w=800&h=500&fit=crop",
    rating: 4.6,
    reviews: 1678,
    category: "Mountain"
  },
  {
    id: 22,
    name: "Kerala",
    country: "India",
    description: "Cruise tranquil backwaters, unwind on palm-fringed beaches, and rejuvenate with ancient Ayurveda.",
    price: 549,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1602218204108-7ff8a2cbe503?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 1987,
    category: "Beach"
  },
  {
    id: 23,
    name: "London",
    country: "UK",
    description: "Royal palaces, world-class museums, West End theatre, and a multicultural urban tapestry.",
    price: 1699,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1513635269971-39efb74a2b70?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 2980,
    category: "City"
  },
  {
    id: 24,
    name: "Singapore",
    country: "Singapore",
    description: "Futuristic gardens, hawker food heavens, and a multicultural metropolis where east meets west.",
    price: 1099,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1525625299863-4cb9654be7f1?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 1543,
    category: "City"
  },
  {
    id: 25,
    name: "Queenstown",
    country: "New Zealand",
    description: "The adventure capital of the world — bungee jumping, skydiving, and breathtaking fjord landscapes.",
    price: 2699,
    duration: "10 Days",
    image: "https://images.unsplash.com/photo-1507699622108-4be3eab98c25?w=800&h=500&fit=crop",
    rating: 4.9,
    reviews: 765,
    category: "Adventure"
  },
  {
    id: 26,
    name: "Cape Town",
    country: "South Africa",
    description: "Table Mountain views, penguin beaches, vibrant waterfront, and world-renowned vineyards.",
    price: 1799,
    duration: "8 Days",
    image: "https://images.unsplash.com/photo-1580060839531-2b3d1e7d6f44?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 1234,
    category: "City"
  },
  {
    id: 27,
    name: "Siem Reap",
    country: "Cambodia",
    description: "Explore the magnificent Angkor Wat temple complex at sunrise — a spiritual journey through time.",
    price: 899,
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1528699639095-2c4d56a70d76?w=800&h=500&fit=crop",
    rating: 4.7,
    reviews: 876,
    category: "Heritage"
  },
  {
    id: 28,
    name: "Hawaii",
    country: "USA",
    description: "Volcanic landscapes, surfing paradise, luau feasts, and the true spirit of Aloha.",
    price: 2399,
    duration: "8 Days",
    image: "https://images.unsplash.com/photo-1507871322927-7e78bb7e1f9e?w=800&h=500&fit=crop",
    rating: 4.8,
    reviews: 1098,
    category: "Beach"
  },
  {
    id: 29,
    name: "Patagonia",
    country: "Argentina",
    description: "Trek through dramatic glaciers, towering peaks, and pristine wilderness at the end of the world.",
    price: 2799,
    duration: "12 Days",
    image: "https://images.unsplash.com/photo-1531757299815-7ee72245ad2d?w=800&h=500&fit=crop",
    rating: 4.9,
    reviews: 543,
    category: "Mountain"
  },
  {
    id: 30,
    name: "Varanasi",
    country: "India",
    description: "One of the world's oldest living cities — witness the spiritual Ganga Aarti along sacred ghats.",
    price: 399,
    duration: "4 Days",
    image: "https://images.unsplash.com/photo-1561361058-67a5e7f42c81?w=800&h=500&fit=crop",
    rating: 4.6,
    reviews: 1342,
    category: "Heritage"
  }
];

export const categories = ["All", "Beach", "City", "Mountain", "Heritage", "Adventure"];
