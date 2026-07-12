export interface RoomGalleryImage {
 id: string | number;
  src: string;
  alt: string;
}

export interface RoomFeature {
 id: string | number;
  title: string;
}

export interface RoomPageItem {
 id: string | number;
  slug: string;

  title: string;
  subtitle: string;

  shortDescription: string;
  description: string;

  price: string;

  heroImage: string;
  coverImage: string;

  gallery: RoomGalleryImage[];

 featuresTitle: string;

  features: RoomFeature[];


    complimentaryBreakfast?: boolean;
     breakfastSelectionLimit?: number;
     complimentaryLunchDinner?: boolean;

}

export const roomPageData: RoomPageItem[] = [
  {
    id: 1,

    slug: "deluxe-room",

    title: "Deluxe Room",

    subtitle: "Elegant Comfort",


    
  // complimentaryBreakfast: true,
  // breakfastSelectionLimit: 1,
   

    shortDescription:
      "Designed for travelers seeking comfort, warmth, and modern luxury.",

    description:
      "Experience thoughtfully designed interiors, premium bedding, warm lighting, spacious bathrooms, and elegant furnishings that create a calm and luxurious stay. Every detail has been carefully selected to provide exceptional comfort and relaxation throughout your visit.",

    price: "Starting from ₹2,499 / Night",

    heroImage: "/images/rooms/deluxe.jpg",

    coverImage: "/images/rooms/deluxe.jpg",
    

    gallery: [
      {
        id: 1,
        src: "/images/rooms/deluxe.jpg",
        alt: "Deluxe Room View",
      },
      {
        id: 2,
        src: "/images/rooms/premium.jpg",
        alt: "Bedroom Interior",
      },
      {
        id: 3,
        src: "/images/rooms/deluxe.jpg",
        alt: "Luxury Bathroom",
      },
      {
        id: 4,
        src: "/images/rooms/deluxe.jpg",
        alt: "Seating Area",
      },
    ],

    featuresTitle: "Amenities",

    features: [
      {
        id: 1,
        title: "King Size Bed",
      },
      {
        id: 2,
        title: "Free High-Speed Wi-Fi",
      },
      {
        id: 3,
        title: "Air Conditioning",
      },
      {
        id: 4,
        title: "Smart TV",
      },
      {
        id: 5,
        title: "Luxury Bathroom",
      },
      {
        id: 6,
        title: "Room Service",
      },
      // {
      //   id: 7,
      //    title: "Complimentary Breakfast",
      // },
      // {
      //   id: 8,
      //   title: "Premium Toiletries",
      // },
    ],
  },

  {
    id: 2,

    slug: "premium-room",

    title: "Premium Room",

    subtitle: "Luxury Living",


  complimentaryBreakfast: true,
  breakfastSelectionLimit: 2,

  complimentaryLunchDinner: true,


    shortDescription:
      "A spacious premium room crafted with refined elegance and timeless interiors.",

    description:
      "Enjoy larger living spaces with sophisticated interiors, handcrafted furniture, luxury bedding, and premium amenities that provide a memorable stay. Perfect for guests looking for additional comfort and an elevated hospitality experience.",

    price: "Starting from ₹3,499 / Night",

    heroImage: "/images/rooms/premium.jpg",

    coverImage: "/images/rooms/premium.jpg",

    gallery: [
      {
        id: 1,
        src: "/images/rooms/premium.jpg",
        alt: "Premium Room",
      },
      {
        id: 2,
        src: "/images/rooms/premium.jpg",
        alt: "Luxury Interior",
      },
      {
        id: 3,
        src: "/images/rooms/premium.jpg",
        alt: "Premium Bathroom",
      },
      {
        id: 4,
        src: "/images/rooms/premium.jpg",
        alt: "Premium Seating",
      },
    ],
     
    featuresTitle: "Amenities",

    features: [
      {
        id: 1,
        title: "King Size Bed",
      },   

      {
        id: 2,
        title: "Smart TV",
      },
               {
        id: 6,
        title: "Complimentary Breakfast",
      },
       {
        id: 7,
        title: "Complimentary Lunch",
      },
      {
        id: 3,
        title: "Mini Refrigerator",
      },
      {
        id: 4,
        title: "Luxury Bathroom",
      },
      {
        id: 5,
        title: "Free Wi-Fi",
      },
    

      {
        id: 8,
        title: "Room Service",
      },
    ],
  },

  {
    id: 3,

    slug: "family-suite",

    title: "Family Suite",

    subtitle: "Space For Everyone",

    
  complimentaryBreakfast: true,

  breakfastSelectionLimit: 3,

  complimentaryLunchDinner: true,

    shortDescription:
      "An expansive suite thoughtfully designed for families and extended stays.",

    description:
      "Enjoy generous living space, multiple seating areas, premium bedding, and family-friendly amenities that ensure every guest experiences complete comfort. Ideal for vacations, celebrations, and memorable family moments.",

    price: "Starting from ₹4,999 / Night",

    heroImage: "/images/rooms/executive.jpg",

    coverImage: "/images/rooms/executive.jpg",

    gallery: [
      {
        id: 1,
        src: "/images/rooms/executive.jpg",
        alt: "Family Suite",
      },
      {
        id: 2,
        src: "/images/rooms/executive.jpg",
        alt: "Family Bedroom",
      },
      {
        id: 3,
        src: "/images/rooms/executive.jpg",
        alt: "Living Area",
      },
      {
        id: 4,
        src: "/images/rooms/executive.jpg",
        alt: "Family Lounge",
      },
    ],
    
    featuresTitle: "Amenities",

    features: [
      {
        id: 1,
        title: "Two Queen Beds",
      },
      {
        id: 2,
        title: "Living Area",
      },
           {
        id: 7,
        title: "Complimentary Breakfast",
      },
        {
        id: 8,
        title: "Complimentary Lunch",
      },
      {
        id: 3,
        title: "Luxury Bathroom",
      },
      {
        id: 4,
        title: "Free Wi-Fi",
      },
      {
        id: 5,
        title: "Smart TV",
      },
      {
        id: 6,
        title: "24×7 Room Service",
      },
  
    ],
  },
];