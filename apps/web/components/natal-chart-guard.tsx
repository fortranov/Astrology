"use client";

import { BirthProfileForm } from "@/components/birth-profile-form";
import { useAuthSession } from "@/components/use-auth-session";

export function NatalChartGuard() {
  const { me, loading } = useAuthSession();

  if (loading) {
    return <p className="muted">Проверяю доступ...</p>;
  }

  if (!me) {
    return <p className="muted">Перенаправляю на вход...</p>;
  }

  return <BirthProfileForm />;
}
