import { AppShell } from "@/components/app-shell";

const dashboardCards = [
  {
    title: "Натальная карта",
    text: "Создайте и сохраните профиль рождения, чтобы подготовить основу для дальнейших астрологических расчётов.",
    href: "/natal-chart",
    action: "Открыть модуль",
  },
  {
    title: "Таро",
    text: "Зона для раскладов и интерпретаций. Сейчас это базовая заготовка под будущий рабочий сценарий.",
    href: "/tarot",
    action: "Перейти",
  },
  {
    title: "Аккаунт",
    text: "После входа пользователь попадает именно сюда: это стартовая точка авторизованной части сервиса.",
    href: "/dashboard",
    action: "Вы на месте",
  },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="Главная страница после авторизации. Отсюда пользователь переходит к основному функционалу сервиса."
    >
      <div className="grid-3">
        {dashboardCards.map((card) => (
          <article className="card" key={card.title}>
            <div className="kicker">Раздел</div>
            <h2>{card.title}</h2>
            <p className="muted">{card.text}</p>
            <div className="actions">
              <a className="button button-secondary" href={card.href}>
                {card.action}
              </a>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
