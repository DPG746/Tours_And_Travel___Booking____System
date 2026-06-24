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
  }
];

export const categories = ["All", "Beach", "City"];
