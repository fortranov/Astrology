import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="kicker">Auth</div>
        <h1>Вход в систему</h1>
        <p className="muted">Войди по email и паролю, чтобы открыть административные настройки.</p>
        <LoginForm />
      </div>
    </main>
  );
}
