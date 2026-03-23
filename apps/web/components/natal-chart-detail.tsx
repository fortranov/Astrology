"use client";

import { useState } from "react";

type NatalChartDetail = {
  id: number;
  birth_profile_id: number;
  summary: string;
  sun_sign: string;
  interpretation: string;
  moon_sign: string;
  rising_sign: string;
  dominant_element: string;
  strengths: string[];
  growth_zones: string[];
  love_reading: string;
  career_reading: string;
  purpose_reading: string;
  recommendations: string[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/proxy-api";

export function NatalChartDetailCard({ chartId }: { chartId: number }) {
  const [detail, setDetail] = useState<NatalChartDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDetail() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/natal-chart/${chartId}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить детальный разбор");
      }

      const data = (await response.json()) as NatalChartDetail;
      setDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="detail-card-wrap">
      <button className="button button-secondary inline-button" onClick={() => void loadDetail()} type="button">
        {loading ? "Открываю разбор..." : "Открыть подробный разбор"}
      </button>

      {error ? <p className="error-text">{error}</p> : null}

      {detail ? (
        <div className="detail-card">
          <div className="detail-grid">
            <article className="profile-item">
              <strong>Солнце</strong>
              <span>{detail.sun_sign}</span>
            </article>
            <article className="profile-item">
              <strong>Луна</strong>
              <span>{detail.moon_sign}</span>
            </article>
            <article className="profile-item">
              <strong>Асцендент</strong>
              <span>{detail.rising_sign}</span>
            </article>
            <article className="profile-item">
              <strong>Доминирующая стихия</strong>
              <span>{detail.dominant_element}</span>
            </article>
          </div>

          <article className="profile-item">
            <strong>Общее описание</strong>
            <span className="muted">{detail.interpretation}</span>
          </article>

          <article className="profile-item">
            <strong>Сильные стороны</strong>
            <ul className="detail-list">
              {detail.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="profile-item">
            <strong>Зоны роста</strong>
            <ul className="detail-list">
              {detail.growth_zones.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="profile-item">
            <strong>Отношения</strong>
            <span className="muted">{detail.love_reading}</span>
          </article>

          <article className="profile-item">
            <strong>Карьера</strong>
            <span className="muted">{detail.career_reading}</span>
          </article>

          <article className="profile-item">
            <strong>Предназначение</strong>
            <span className="muted">{detail.purpose_reading}</span>
          </article>

          <article className="profile-item">
            <strong>Рекомендации</strong>
            <ul className="detail-list">
              {detail.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      ) : null}
    </div>
  );
}
