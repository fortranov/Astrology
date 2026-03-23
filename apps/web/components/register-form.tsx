"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Такой email уже зарегистрирован");
        }
        throw new Error("Не удалось зарегистрироваться");
      }

      setSuccess("Регистрация прошла успешно. Теперь можно войти.");
      setPassword("");
      setTimeout(() => router.push("/login"), 900);
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
          {loading ? "Регистрирую..." : "Зарегистрироваться"}
        </button>
      </div>
      {error ? <p className="error-text">{error}</p> : null}
      {success ? <p className="success-text">{success}</p> : null}
    </form>
  );
}
