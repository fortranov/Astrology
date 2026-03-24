import { AppShell } from "@/components/app-shell";
import { NatalChartGuard } from "@/components/natal-chart-guard";

export default function NatalChartPage() {
  return (
    <AppShell
      title="Натальная карта"
      description="Один из основных модулей сервиса. Пользователь открывает его из меню после авторизации."
    >
      <NatalChartGuard />
    </AppShell>
  );
}
