"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BirthProfileForm } from "@/components/birth-profile-form";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

type Me = {
  email: string;
  is_admin: boolean;
};

export function NatalChartGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("astrology_access_token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = (await response.json()) as Me;
        if (!data.email) {
          router.push("/login");
          return;
        }

        setAuthorized(true);
      } finally {
        setLoading(false);
      }
    }

    void checkAuth();
  }, [router]);

  if (loading) {
    return <p className="muted">Проверяю доступ...</p>;
  }

  if (!authorized) {
    return <p className="muted">Перенаправляю на вход...</p>;
  }

  return <BirthProfileForm />;
}
