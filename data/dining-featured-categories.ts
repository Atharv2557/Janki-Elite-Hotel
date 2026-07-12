export type FeaturedDiningCategory = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  menuCategoryIds: string[];
};

export const featuredDiningCategories: FeaturedDiningCategory[] = [
  {
    id: "indian-classics",
    title: "Indian Classics",
    subtitle: "Rich curries, tandoori favourites, rice and Indian breads.",
    image: "/images/dining/indian-classics.jpg",
    menuCategoryIds: [
      "indian-and-tandoor-starters",
      "indian-main-course",
      "rice-and-noodles",
      "breads",
      "salad",
      "raita",
    ],
  },
  {
    id: "italian-favourites",
    title: "Italian Favourites",
    subtitle: "Pizza, pasta and comforting Italian-style starters.",
    image: "/images/dining/italian-favourites.jpg",
    menuCategoryIds: [
      "pizza",
      "italian-starters",
      "pasta",
    ],
  },
  {
    id: "chinese-selection",
    title: "Chinese Selection",
    subtitle: "Crispy starters, noodles, rice and flavourful gravies.",
    image: "/images/dining/chinese-selection.webp",
    menuCategoryIds: [
      "chinese-starter",
      "chinese-and-thai-main-course",
      "rice-and-noodles",
    ],
  },
  {
    id: "quick-bites",
    title: "Quick Bites",
    subtitle: "Snacks, soups, sandwiches, burgers and light favourites.",
    image: "/images/dining/quick-bites.jpg",
    menuCategoryIds: [
      "quick-service",
      "soup",
      "sandwich-and-burger",
      "rolls-and-wraps",
      "tibetan-momos",
    ],
  },
];