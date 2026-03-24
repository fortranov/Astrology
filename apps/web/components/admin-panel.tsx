"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

type AuthSettings = {
  google_auth_enabled: boolean;
};

export function AdminPanel() {
  const [settings, setSettings] = useState<AuthSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function authorizedFetch(path: string, init?: RequestInit) {
    const token = localStorage.getItem("astrology_access_token");
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
    });
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const settingsResponse = await authorizedFetch("/admin/auth-settings", { method: "GET" });
        if (!settingsResponse.ok) {
          throw new Error("Не удалось загрузить настройки авторизации");
        }
        const settingsData = (await settingsResponse.json()) as AuthSettings;
        setSettings(settingsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function saveGoogleAuth(enabled: boolean) {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await authorizedFetch("/admin/auth-settings", {
        method: "PATCH",
        body: JSON.stringify({ google_auth_enabled: enabled }),
      });
      if (!response.ok) {
        throw new Error("Не удалось сохранить настройку Google auth");
      }
      const data = (await response.json()) as AuthSettings;
      setSettings(data);
      setSuccess("Настройка сохранена");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="muted">Загружаю настройки...</p>;
  }

  return (
    <section className="card">
      <div className="kicker">Администрирование</div>
      <h2>Настройки входа</h2>
      <label className="toggle-row">
        <span>Включить авторизацию через Google</span>
        <input
          type="checkbox"
          checked={settings?.google_auth_enabled ?? false}
          disabled={saving}
          onChange={(e) => void saveGoogleAuth(e.target.checked)}
        />
      </label>
      <p className="muted">
        Пока это административный feature toggle. Следующим шагом можно будет подключить реальный OAuth flow.
      </p>
      {error ? <p className="error-text">{error}</p> : null}
      {success ? <p className="success-text">{success}</p> : null}
    </section>
  );
}
