"use client";

import { FormEvent, useMemo, useState } from "react";

import { NatalChartDetailCard } from "@/components/natal-chart-detail";

type BirthProfile = {
  id: number;
  name: string;
  birth_date: string;
  birth_time?: string | null;
  birth_place: string;
};

type NatalChartResult = {
  id: number;
  birth_profile_id: number;
  summary: string;
  sun_sign: string;
  interpretation: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

export function BirthProfileForm() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [profiles, setProfiles] = useState<BirthProfile[]>([]);
  const [charts, setCharts] = useState<NatalChartResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [calculatingId, setCalculatingId] = useState<number | null>(null);
  const [deletingProfileId, setDeletingProfileId] = useState<number | null>(null);
  const [deletingChartId, setDeletingChartId] = useState<number | null>(null);
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

  async function loadCharts() {
    const response = await fetch(`${API_BASE}/natal-chart`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить результаты натальной карты");
    }

    const data = (await response.json()) as NatalChartResult[];
    setCharts(data);
  }

  async function refreshAll() {
    await Promise.all([loadProfiles(), loadCharts()]);
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
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  async function calculateNatalChart(profileId: number) {
    setCalculatingId(profileId);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE}/natal-chart/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ birth_profile_id: profileId }),
      });

      if (!response.ok) {
        throw new Error("Не удалось рассчитать натальную карту");
      }

      setSuccess("Натальная карта рассчитана");
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setCalculatingId(null);
    }
  }

  async function deleteProfile(profileId: number) {
    setDeletingProfileId(profileId);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE}/birth-profiles/${profileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить профиль");
      }

      setSuccess("Профиль удалён");
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setDeletingProfileId(null);
    }
  }

  async function deleteChart(chartId: number) {
    setDeletingChartId(chartId);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE}/natal-chart/${chartId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить натальную карту");
      }

      setSuccess("Натальная карта удалена");
      await refreshAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setDeletingChartId(null);
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
            <button className="button button-secondary" onClick={() => void refreshAll()} type="button">
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
                <div className="inline-actions">
                  <button
                    className="button button-secondary inline-button"
                    disabled={calculatingId === profile.id}
                    onClick={() => void calculateNatalChart(profile.id)}
                    type="button"
                  >
                    {calculatingId === profile.id ? "Считаю..." : "Рассчитать натальную карту"}
                  </button>
                  <button
                    className="button button-danger inline-button"
                    disabled={deletingProfileId === profile.id}
                    onClick={() => void deleteProfile(profile.id)}
                    type="button"
                  >
                    {deletingProfileId === profile.id ? "Удаляю..." : "Удалить профиль"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <div className="kicker">Результаты MVP</div>
          {charts.length === 0 ? (
            <p className="muted">Пока расчётов нет.</p>
          ) : (
            <div className="profile-list">
              {charts.map((chart) => (
                <article className="profile-item" key={chart.id}>
                  <strong>{chart.summary}</strong>
                  <span>Солнце: {chart.sun_sign}</span>
                  <span className="muted">{chart.interpretation}</span>
                  <div className="inline-actions">
                    <NatalChartDetailCard chartId={chart.id} />
                    <button
                      className="button button-danger inline-button"
                      disabled={deletingChartId === chart.id}
                      onClick={() => void deleteChart(chart.id)}
                      type="button"
                    >
                      {deletingChartId === chart.id ? "Удаляю..." : "Удалить карту"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
