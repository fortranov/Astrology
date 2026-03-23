import { AdminPanel } from "@/components/admin-panel";

export default function AdminPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div style={{ marginBottom: 24 }}>
        <div className="kicker">Admin</div>
        <h1>Администрирование</h1>
        <p className="muted">Управление базовыми настройками доступа к сервису.</p>
      </div>
      <AdminPanel />
    </main>
  );
}
