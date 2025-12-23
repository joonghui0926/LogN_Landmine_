// src/App.js

import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";

function App() {
  const [role, setRole] = useState(null);           // 'guest' | 'admin' | null
  const [stage, setStage] = useState("landing");    // 'landing' | 'login' | 'dashboard'

  // 새로고침해도 로그인 유지 (localStorage)
  useEffect(() => {
    const saved = window.localStorage.getItem("landmine_role");
    if (saved === "guest" || saved === "admin") {
      // 역할만 복원하고, stage는 그대로 'landing' 유지
      // -> 무조건 랜딩 먼저 보여주고, Try Now 누르면 바로 대시보드로 가게
      setRole(saved);
    }
  }, []);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    window.localStorage.setItem("landmine_role", selectedRole);
    setStage("dashboard");
  };

  const handleLogout = () => {
    setRole(null);
    window.localStorage.removeItem("landmine_role");
    setStage("landing"); // 로그아웃하면 다시 랜딩으로
  };

  const handleEnterFromLanding = () => {
    // 랜딩에서 Try Now 눌렀을 때:
    // 이미 role 있으면 바로 대시보드, 없으면 로그인 페이지로
    if (role === "guest" || role === "admin") {
      setStage("dashboard");
    } else {
      setStage("login");
    }
  };

  // 1) 랜딩 페이지 단계
  if (stage === "landing") {
    return <LandingPage onEnterDashboard={handleEnterFromLanding} />;
  }

  // 2) 로그인 단계
  if (stage === "login" && !role) {
    return <Login onLogin={handleLogin} />;
  }

  // 3) 그 외에는 대시보드
  return <Dashboard role={role} onLogout={handleLogout} />;
}

export default App;
