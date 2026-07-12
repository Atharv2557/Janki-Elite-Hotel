export type MealItem = {
  id: string;
  name: string;
};

export type MealCategory = {
  id: string;
  title: string;
  subtitle: string;
  selectionLimit: number;
  items: MealItem[];
};

export const breakfastCpPlan: MealCategory = {
  id: "breakfast-cp-plan",
  title: "Breakfast CP Plan",
  subtitle: "Choose any 2 items from the breakfast menu.",
  selectionLimit: 2,
  items: [
    {
      id: "poori-bhaji",
      name: "Poori Bhaji",
    },
    {
      id: "poha",
      name: "Poha",
    },
    {
      id: "choley-bhature",
      name: "Choley Bhature",
    },
    {
      id: "paranthe",
      name: "Paranthe",
    },
    {
      id: "aloo-parantha",
      name: "Aloo Parantha",
    },
  ],
};

export const lunchDinnerPlan: MealCategory = {
  id: "lunch-dinner-plan",
  title: "Lunch / Dinner Plan",
  subtitle: "Choose one item from each section for single or group meals.",
  selectionLimit: 1,
  items: [
    {
      id: "paneer-dish",
      name: "Paneer Dish",
    },
    {
      id: "vegetable",
      name: "Vegetable",
    },
    {
      id: "dal",
      name: "Dal",
    },
    {
      id: "rice",
      name: "Rice",
    },
    {
      id: "naan-roti-parantha",
      name: "Naan / Roti / Parantha",
    },
    {
      id: "salad-papad-pickle",
      name: "Salad / Papad / Pickle",
    },
  ],
};

export const mealCategories: MealCategory[] = [
  breakfastCpPlan,
  lunchDinnerPlan,
];