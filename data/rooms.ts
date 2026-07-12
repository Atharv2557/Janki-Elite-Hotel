import type { Room } from "@/components/sections/rooms/types";

export const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Room",
    image: "/images/rooms/deluxe.jpg",
    description:
      "Elegant interiors with king-size bed, premium linens and modern amenities.",
    price: 3499,
    guests: 2,
    beds: 1,
    area: "320 sq.ft",
    featured: false,
  },
  {
    id: 2,
    name: "Premium Room",
    image: "/images/rooms/premium.jpg",
    description:
      "Spacious premium room designed for couples and business travellers.",
    price: 4499,
    guests: 3,
    beds: 1,
    area: "420 sq.ft",
    featured: true,
  },
  {
    id: 3,
    name: "Executive Suite",
    image: "/images/rooms/executive.jpg",
    description:
      "Luxury suite offering spacious living, workspace and premium comfort.",
    price: 6499,
    guests: 4,
    beds: 2,
    area: "650 sq.ft",
    featured: false,
  },
];