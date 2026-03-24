import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="kicker">Auth</div>
        <h1>Регистрация</h1>
        <p className="muted">Создай аккаунт по email и паролю, чтобы после входа попасть на dashboard сервиса.</p>
        <RegisterForm />
      </div>
    </main>
  );
}
