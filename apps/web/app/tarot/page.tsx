import { AppShell } from "@/components/app-shell";

export default function TarotPage() {
  return (
    <AppShell
      title="Таро"
      description="Заготовка под отдельный функциональный раздел сервиса внутри авторизованной зоны."
    >
      <div className="card">
        <div className="kicker">In progress</div>
        <h2>Модуль Таро</h2>
        <p className="muted">
          Здесь будет модуль раскладов: выбор формата, вытягивание карт и интерпретация результата.
        </p>
      </div>
    </AppShell>
  );
}
