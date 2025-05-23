// src/pages/Login.tsx
import { useState } from "react";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      console.log("Полный ответ сервера:", {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: await response.clone().text() // clone чтобы не "испортить" response
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Ошибка авторизации");
      }

      const data = await response.json();
      setToken(data.accessToken); // сохраняем токен
      
    
      localStorage.setItem("token", data.accessToken); // можно сохранить в localStorage
      window.location.href = "/userpage";
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Войти</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;