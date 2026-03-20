import type { User } from "../types/User";

export function getLocalUser(): User {
  return JSON.parse(localStorage.getItem("user")!);
}

export function setLocalUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}


export function removeLocalUser() {
  localStorage.removeItem("user");
}