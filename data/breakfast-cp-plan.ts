export type BreakfastCpItem = {
  id: string;
  name: string;
};

export const breakfastCpPlan = {
  title: "Breakfast CP Plan",
  subtitle: "Choose any 2 items from the complimentary breakfast menu.",
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