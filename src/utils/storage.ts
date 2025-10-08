interface userState {
  id: string;
  isLoggedIn: boolean;
}

export function getUser(): userState {
  return JSON.parse(localStorage.getItem("user")!);
}

export function setUser(user: userState) {
  localStorage.setItem("user", JSON.stringify(user));
}
