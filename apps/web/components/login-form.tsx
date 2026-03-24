"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Неверный email или пароль");
      }

      const data = await response.json();
      localStorage.setItem("astrology_access_token", data.access_token);
      localStorage.setItem("astrology_user_email", data.email);
      localStorage.setItem("astrology_user_is_admin", String(data.is_admin));
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="birth-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <span>Пароль</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div className="actions">
        <button className="button button-primary" disabled={loading} type="submit">
          {loading ? "Вхожу..." : "Войти"}
        </button>
      </div>
      {error ? <p className="error-text">{error}</p> : null}
    </form>
  );
}
