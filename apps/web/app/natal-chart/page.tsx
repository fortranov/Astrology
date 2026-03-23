import { BirthProfileForm } from "@/components/birth-profile-form";

export default function NatalChartPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div style={{ marginBottom: 24 }}>
        <div className="kicker">Natal chart workflow</div>
        <h1>Натальная карта</h1>
        <p className="muted">
          Первый реальный продуктовый flow: создаём профиль рождения, сохраняем его через API и готовим основу для расчёта карты.
        </p>
      </div>
      <BirthProfileForm />
    </main>
  );
}
