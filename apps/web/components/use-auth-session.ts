"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

export type AuthMe = {
  email: string;
  is_admin: boolean;
};

export function clearAuthSession() {
  localStorage.removeItem("astrology_access_token");
  localStorage.removeItem("astrology_user_email");
  localStorage.removeItem("astrology_user_is_admin");
}

export function useAuthSession(options?: { requireAdmin?: boolean }) {
  const router = useRouter();
  const [me, setMe] = useState<AuthMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("astrology_access_token");
      if (!token) {
        router.push("/login");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Нужно заново войти в систему");
        }

        const data = (await response.json()) as AuthMe;
        if (!data.email) {
          throw new Error("Нужно заново войти в систему");
        }

        if (options?.requireAdmin && !data.is_admin) {
          throw new Error("Недостаточно прав для просмотра этой страницы");
        }

        setMe(data);
      } catch (err) {
        clearAuthSession();
        const message = err instanceof Error ? err.message : "Произошла ошибка";
        setError(message);
        router.push(options?.requireAdmin ? "/dashboard" : "/login");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [options?.requireAdmin, router]);

  function logout() {
    clearAuthSession();
    router.push("/login");
    router.refresh();
  }

  return { me, loading, error, logout };
}
