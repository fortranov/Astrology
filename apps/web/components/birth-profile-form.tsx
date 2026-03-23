"use client";

import { FormEvent, useMemo, useState } from "react";

type BirthProfile = {
  id: number;
  name: string;
  birth_date: string;
  birth_time?: string | null;
  birth_place: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export function BirthProfileForm() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [profiles, setProfiles] = useState<BirthProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(name.trim() && birthDate.trim() && birthPlace.trim());
  }, [name, birthDate, birthPlace]);

  async function loadProfiles() {
    const response = await fetch(`${API_BASE}/birth-profiles`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить профили");
    }

    const data = (await response.json()) as BirthProfile[];
    setProfiles(data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE}/birth-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          birth_date: birthDate,
          birth_time: birthTime || null,
          birth_place: birthPlace,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось сохранить профиль рождения");
      }

      setSuccess("Профиль рождения сохранён");
      setName("");
      setBirthDate("");
      setBirthTime("");
      setBirthPlace("");
      await loadProfiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="birth-layout">
      <section className="card">
        <div className="kicker">Шаг 1</div>
        <h2>Создать профиль рождения</h2>
        <p className="muted">
          Это первый рабочий сценарий для будущего расчёта натальной карты и персональных прогнозов.
        </p>

        <form className="birth-form" onSubmit={handleSubmit}>
          <label>
            <span>Имя</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Вера" />
          </label>

          <label>
            <span>Дата рождения</span>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </label>

          <label>
            <span>Время рождения</span>
            <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
          </label>

          <label>
            <span>Место рождения</span>
            <input value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} placeholder="Москва, Россия" />
          </label>

          <div className="actions">
            <button className="button button-primary" disabled={!canSubmit || loading} type="submit">
              {loading ? "Сохраняю..." : "Сохранить профиль"}
            </button>
            <button className="button button-secondary" onClick={() => void loadProfiles()} type="button">
              Обновить список
            </button>
          </div>
        </form>

        {error ? <p className="error-text">{error}</p> : null}
        {success ? <p className="success-text">{success}</p> : null}
      </section>

      <section className="card">
        <div className="kicker">Шаг 2</div>
        <h2>Сохранённые профили</h2>
        <p className="muted">
          Позже отсюда можно будет запускать расчёт натальной карты, прогнозов и совместимости.
        </p>

        {profiles.length === 0 ? (
          <p className="muted">Пока профилей нет. Создай первый профиль слева.</p>
        ) : (
          <div className="profile-list">
            {profiles.map((profile) => (
              <article className="profile-item" key={profile.id}>
                <strong>{profile.name}</strong>
                <span>{profile.birth_date}</span>
                <span>{profile.birth_time || "Время не указано"}</span>
                <span>{profile.birth_place}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
