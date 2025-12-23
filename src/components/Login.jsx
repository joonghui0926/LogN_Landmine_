// src/components/Login.jsx
// 🔐 아주 간단한 데모용 로그인 화면

import { useState } from "react";
import "../styles/Dashboard.css"; // 폰트/배경 재사용용 (원하면 분리 가능)

function Login({ onLogin }) {
  const [role, setRole] = useState("guest"); // 'guest' | 'admin'
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 데모용: admin 비번은 고정 문자열 (진짜 서비스에서는 이렇게 하면 안 됨)
    if (role === "admin" && password !== "landmine123") {
      setError("Wrong admin password.");
      return;
    }

    setError("");
    onLogin(role); // App 쪽에 역할 전달
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <h1 className="login-title">LandMine Monitoring</h1>
        <p className="login-subtitle">
          Sign in as a guest or administrator to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Select role</label>
          <div className="login-role-row">
            <button
              type="button"
              className={
                "login-role-btn" + (role === "guest" ? " login-role-btn-active" : "")
              }
              onClick={() => setRole("guest")}
            >
              Guest
            </button>
            <button
              type="button"
              className={
                "login-role-btn" + (role === "admin" ? " login-role-btn-active" : "")
              }
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          {role === "admin" && (
            <>
              <label className="login-label" htmlFor="password">
                Admin password
              </label>
              <input
                id="password"
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </>
          )}

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit">
            Enter dashboard
          </button>
        </form>

        <p className="login-hint">
          Demo password for admin: <code>landmine123</code>
        </p>
      </div>
    </div>
  );
}

export default Login;
