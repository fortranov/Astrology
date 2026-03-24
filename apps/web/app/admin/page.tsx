import { AppShell } from "@/components/app-shell";
import { AdminPanel } from "@/components/admin-panel";

export default function AdminPage() {
  return (
    <AppShell
      title="Настройки"
      description="Страница доступна только администраторам. Здесь находятся базовые настройки сервиса и авторизации."
      requireAdmin
    >
      <AdminPanel />
    </AppShell>
  );
}
