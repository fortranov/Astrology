const featureCards = [
  {
    title: "Натальная карта",
    text: "Построение карты рождения, базовые интерпретации и подготовка к персональным разборам.",
  },
  {
    title: "Прогнозы",
    text: "Персональные ежедневные и периодические прогнозы на базе астрологических правил и AI-слоя.",
  },
  {
    title: "Таро",
    text: "Онлайн-расклады с красивым ритуальным UX и мягкой интерпретацией результата.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge">Astrology platform • MVP foundation</div>
            <h1 className="title">Астрология, прогнозы и Таро в одном сервисе</h1>
            <p className="subtitle">
              Закладываем основу продукта: современный frontend на Next.js, FastAPI backend
              и архитектуру, из которой потом можно вырастить полноценный коммерческий сервис.
            </p>
            <div className="actions">
              <a className="button button-primary" href="/natal-chart">Натальная карта</a>
              <a className="button button-secondary" href="/tarot">Таро</a>
              <a className="button button-secondary" href="/login">Войти</a>
              <a className="button button-secondary" href="/register">Регистрация</a>
            </div>
          </div>
          <div className="card">
            <div className="kicker">Что уже заложено</div>
            <h2>Первый итеративный старт</h2>
            <p className="muted">
              Базовая структура монорепозитория, стартовые страницы, API-модули и продуктовая
              документация. Следующий шаг — формы рождения, хранилище профилей и первый рабочий flow.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {featureCards.map((card) => (
              <article className="card" key={card.title}>
                <div className="kicker">Модуль</div>
                <h3>{card.title}</h3>
                <p className="muted">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
