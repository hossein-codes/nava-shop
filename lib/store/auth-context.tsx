"use client";

/**
 * Context احراز هویت (شبیه‌سازی شده)
 * کاربران و نشست فعلی در localStorage نگه داشته می‌شوند.
 * در نسخه‌ی واقعی باید به‌جای این، از یک بک‌اند (مثلاً NextAuth) استفاده کنید.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types";

const USERS_KEY = "nava:users";
const SESSION_KEY = "nava:session";

export interface SessionUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  /** ورود با ایمیل و رمز؛ در صورت موفقیت true */
  login: (email: string, password: string) => boolean;
  /** ثبت‌نام؛ خروجی پیام خطا یا null در صورت موفقیت */
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return false;
    const session: SessionUser = { name: found.name, email: found.email };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return "این ایمیل قبلاً ثبت شده است.";
    }
    const newUser: User = { name: name.trim(), email: email.trim(), password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const session: SessionUser = { name: newUser.name, email: newUser.email };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  return ctx;
}
