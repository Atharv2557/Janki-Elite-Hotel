export type LunchDinnerItem = {
  id: string;
  name: string;
};

export const lunchDinnerPlan = {
  title: "Lunch Plan",
  subtitle:
    "Includes one paneer dish, one vegetable, one dal, one rice, one bread, and one salad/papad/pickle.",
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
      id: "bread",
      name: "Naan / Roti / Parantha",
    },
    {
      id: "salad-papad-pickle",
      name: "Salad / Papad / Pickle",
    },
  ],
};