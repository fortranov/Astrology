"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { useAuthSession } from "@/components/use-auth-session";

type AppShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  requireAdmin?: boolean;
};

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/natal-chart", label: "Натальная карта" },
  { href: "/tarot", label: "Таро" },
];

export function AppShell({ title, description, children, requireAdmin = false }: AppShellProps) {
  const pathname = usePathname();
  const { me, loading, error, logout } = useAuthSession({ requireAdmin });

  if (loading) {
    return (
      <main className="container app-shell-page">
        <p className="muted">Проверяю доступ...</p>
      </main>
    );
  }

  if (!me) {
    return (
      <main className="container app-shell-page">
        <p className="muted">Перенаправляю...</p>
        {error ? <p className="error-text">{error}</p> : null}
      </main>
    );
  }

  const links = me.is_admin
    ? [...navigation, { href: "/admin", label: "Настройки" }]
    : navigation;

  return (
    <main className="container app-shell-page">
      <div className="app-shell">
        <aside className="card sidebar">
          <div>
            <div className="kicker">Astrology service</div>
            <h2 className="sidebar-title">Меню</h2>
            <p className="muted sidebar-text">Вы вошли как {me.email}</p>
          </div>

          <nav className="sidebar-nav">
            {links.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  className={`nav-link${active ? " nav-link-active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button className="button button-secondary sidebar-logout" onClick={logout} type="button">
            Выйти
          </button>
        </aside>

        <section className="content-area">
          <div className="page-header">
            <div className="kicker">Авторизованная зона</div>
            <h1>{title}</h1>
            <p className="muted">{description}</p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
