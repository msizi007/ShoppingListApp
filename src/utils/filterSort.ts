import type { Filter } from "../components/Table/Table";
import type { Item } from "../features/itemSlice";

export function sortName(items: Item[], filter: Filter) {
  if (filter === "ASC")
    return items.sort((a, b) => a.name.localeCompare(b.name));
  if (filter === "DESC")
    return items.sort((a, b) => b.name.localeCompare(a.name));
  return items;
}

export function sortQuantity(items: Item[], filter: Filter) {
  if (filter === "ASC")
    return items.sort((a, b) => Number(a.quantity) - Number(b.quantity));
  if (filter === "DESC")
    return items.sort((a, b) => Number(b.quantity) - Number(a.quantity));
  return items;
}

export function sortDate(items: Item[], filter: Filter) {
  if (filter === "ASC")
    return items.sort(
      (a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
    );
  if (filter === "DESC")
    return items.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  return items;
}
