export type BreakfastItem = {
  id: string;
  name: string;
  description: string;
};

export type BreakfastCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: BreakfastItem[];
};

export const breakfastCategories: BreakfastCategory[] = [
  {
    id: "indian-classic",
    title: "Indian Classic",
    subtitle: "Traditional Indian breakfast favorites",
    items: [
      {
        id: "poha",
        name: "Poha",
        description: "Light flattened rice cooked with spices, peanuts, and herbs.",
      },
      {
        id: "aloo-paratha",
        name: "Aloo Paratha",
        description: "Stuffed wheat paratha served with curd and pickle.",
      },
      {
        id: "idli-sambar",
        name: "Idli Sambar",
        description: "Soft steamed idlis served with sambar and chutney.",
      },
      {
        id: "upma",
        name: "Upma",
        description: "Semolina cooked with vegetables and mild spices.",
      },
      {
        id: "puri-bhaji",
        name: "Puri Bhaji",
        description: "Fried Indian bread served with spiced potato curry.",
      },
    ],
  },
  {
    id: "continental",
    title: "Continental",
    subtitle: "Light and elegant morning options",
    items: [
      {
        id: "toast-butter",
        name: "Toast with Butter & Jam",
        description: "Crispy bread toast served with butter and fruit jam.",
      },
      {
        id: "cornflakes",
        name: "Cornflakes with Milk",
        description: "Classic cereal served with chilled or warm milk.",
      },
      {
        id: "fruit-bowl",
        name: "Fresh Fruit Bowl",
        description: "Seasonal fresh fruits served chilled.",
      },
      {
        id: "omelette",
        name: "Cheese Omelette",
        description: "Fluffy omelette prepared with cheese and herbs.",
      },
      {
        id: "pancakes",
        name: "Mini Pancakes",
        description: "Soft pancakes served with honey or syrup.",
      },
    ],
  },
  {
    id: "favorites",
    title: "Favorites",
    subtitle: "Most-loved guest breakfast picks",
    items: [
      {
        id: "masala-tea",
        name: "Masala Tea",
        description: "Indian tea brewed with milk and aromatic spices.",
      },
      {
        id: "coffee",
        name: "Hot Coffee",
        description: "Freshly prepared hot coffee.",
      },
      {
        id: "sandwich",
        name: "Grilled Sandwich",
        description: "Toasted sandwich filled with vegetables and cheese.",
      },
      {
        id: "bread-omelette",
        name: "Bread Omelette",
        description: "Classic bread omelette served hot.",
      },
      {
        id: "juice",
        name: "Fresh Juice",
        description: "Seasonal fresh juice served chilled.",
      },
    ],
  },
];

export const allBreakfastItems = breakfastCategories.flatMap(
  (category) => category.items
);