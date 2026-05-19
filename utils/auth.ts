const USER_KEY = "lh-deal-user";

export interface User {
  id: string;
  username: string;
  email: string;
}

const DEFAULT_USER: User = {
  id: "1",
  username: "admin",
  email: "admin@example.com",
};

export const LOGIN_CREDENTIALS = {
  username: "admin",
  password: "66668888",
};

export function login(username: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  
  if (
    username === LOGIN_CREDENTIALS.username &&
    password === LOGIN_CREDENTIALS.password
  ) {
    localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
    window.dispatchEvent(new Event("lh-deal:auth-change"));
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("lh-deal:auth-change"));
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  
  const userStr = localStorage.getItem(USER_KEY);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}