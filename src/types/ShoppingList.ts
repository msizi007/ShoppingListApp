export type Category =
  | "Groceries"
  | "Clothing"
  | "Electronics"
  | "Party"
  | "Personal Care"
  | "Stationery";

export interface ShoppingList {
  id?: string;
  name: string;
  description: string;
  category: Category;
  userId: string;
  dateCreated: string;
}
