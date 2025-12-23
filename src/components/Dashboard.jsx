// Dashboard.jsx
// 전체 대시보드 레이아웃 + 탭 전환 + 데모용 로그인(Guest/Admin)
// 화면 텍스트는 전부 영어, 주석만 한국어입니다.

import React, { useState } from "react";
import "../styles/Dashboard.css";
import GoogleMapView from "./GoogleMapView";
import logo from "../assets/logo.png";
import droneIllust from "../assets/drone_illust.png";

// 데모용 Admin 비밀번호 (실서비스에서는 이렇게 쓰면 안 됨)
const ADMIN_PASSWORD = "landmine123";

function Dashboard() {
  // 로그인 상태: 'guest' | 'admin' | null
  const [role, setRole] = useState(null);
  const [loginRole, setLoginRole] = useState("guest"); // 로그인 화면에서 선택된 역할
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // 어느 페이지가 선택되었는지 상태 관리 ('flight' | 'drone')
  const [activePage, setActivePage] = useState("flight");

  const isAdmin = role === "admin";

  // 로그인 처리
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (loginRole === "admin" && password !== ADMIN_PASSWORD) {
      setLoginError("Wrong admin password.");
      return;
    }

    setRole(loginRole);
    setLoginError("");
    setPassword("");
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setRole(null);
    setPassword("");
    setLoginError("");
  };

  // 아직 로그인 안 된 상태면 로그인 화면 보여주기
  if (!role) {
    return (
      <div className="login-root">
        <div className="login-card">
          <h1 className="login-title">LandMine Monitoring</h1>
          <p className="login-subtitle">
            Sign in as a guest or administrator to access the dashboard.
          </p>

          <form onSubmit={handleLoginSubmit} className="login-form">
            <label className="login-label">Select role</label>
            <div className="login-role-row">
              <button
                type="button"
                className={
                  "login-role-btn" +
                  (loginRole === "guest" ? " login-role-btn-active" : "")
                }
                onClick={() => {
                  setLoginRole("guest");
                  setLoginError("");
                }}
              >
                Guest
              </button>
              <button
                type="button"
                className={
                  "login-role-btn" +
                  (loginRole === "admin" ? " login-role-btn-active" : "")
                }
                onClick={() => {
                  setLoginRole("admin");
                  setLoginError("");
                }}
              >
                Admin
              </button>
            </div>

            {loginRole === "admin" && (
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

            {loginError && <p className="login-error">{loginError}</p>}

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

  // 로그인된 상태면 대시보드 렌더
  return (
    <div className="dashboard-root">
      {/* 사이드바 영역 */}
      <aside className="dashboard-sidebar">
        {/* 브랜드 / 로고 영역 (나중에 이미지 추가 가능) */}
        <div className="sidebar-brand">
            <img
                src={logo}
                alt="LandMine logo"
                className="brand-logo"
            />
            <div className="brand-text">
                <span className="brand-title">LANDMINE</span>
                <span className="brand-subtitle">Monitoring</span>
            </div>
        </div>

        {/* 탭 네비게이션 */}
        <nav className="sidebar-nav">
          <button
            className={
              "sidebar-tab" +
              (activePage === "flight" ? " sidebar-tab-active" : "")
            }
            onClick={() => setActivePage("flight")}
          >
            <span className="tab-dot" />
            <span className="tab-label">Flight & Detection</span>
          </button>

          <button
            className={
              "sidebar-tab" +
              (activePage === "drone" ? " sidebar-tab-active" : "")
            }
            onClick={() => setActivePage("drone")}
          >
            <span className="tab-dot" />
            <span className="tab-label">Drone Status & Maintenance</span>
          </button>
        </nav>

        {/* 사이드바 하단: 로그인 정보 + 로그아웃 버튼 */}
        <div className="sidebar-footer">
          <p className="sidebar-footer-text">
            Logged in as <strong>{isAdmin ? "Admin" : "Guest"}</strong>
          </p>
          <button
            className="ghost-button logout-button"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="dashboard-content">
        {activePage === "flight" ? (
          <FlightAndDetectionPage />
        ) : (
          <DroneStatusPage isAdmin={isAdmin} />
        )}
      </main>
    </div>
  );
}

/* ─────────────────────────────────
   1페이지: Flight path & Mine detection
   ───────────────────────────────── */

// 요약 카드용 더미 데이터
const dummySummary = {
  totalDistance: "124.5 km",
  activeDrones: 1,
  detectedMines: 12,
  clearedMines: 7,
};

// 로그용 더미 데이터
const dummyLogs = [
  {
    id: 1,
    time: "2025-12-08 13:20",
    lat: 37.1234,
    lng: 127.5678,
    detected: true,
    status: "Uncleared",
    confidence: 1,
  },
  {
    id: 2,
    time: "2025-12-08 13:18",
    lat: 37.1201,
    lng: 127.56,
    detected: true,
    status: "Cleared",
    confidence: 1,
  },
  {
    id: 3,
    time: "2025-12-08 13:15",
    lat: 37.11,
    lng: 127.55,
    detected: false,
    status: "—",
    confidence: 2,
  },
  {
    id: 4,
    time: "2025-12-08 13:10",
    lat: 37.1,
    lng: 127.54,
    detected: true,
    status: "False positive",
    confidence: 2,
  },
];

function FlightAndDetectionPage() {
  // 텍스트 로그에서 선택된 좌표 (지금은 지도랑 연동은 안 했고, 구조만 유지)
  const [selectedLog, setSelectedLog] = useState(null);
  const [selectedMine, setSelectedMine] = useState(null);
  return (
    <div className="page page-flight">
      <header className="page-header">
        <div>
          <h1>Flight Path & Mine Detection</h1>
          <p className="page-subtitle">
            Monitor drone flight paths and detected mine coordinates in real time. (Demo
            sample data)
          </p>
        </div>

        {/* Test Run / 샘플 비디오 썸네일 자리 */}
        <div
          className="header-thumbnail"
          aria-label="Test run sample placeholder"
        >
          {/* <img src="..." alt="Test run sample video thumbnail" /> */}
          <span>Test Run Sample</span>
        </div>
      </header>

      <SummaryStrip summary={dummySummary} />

      <section className="page-main-grid">
        <section className="panel map-panel">
            <div className="panel-header">
            <h2>Map View</h2>
            <span className="panel-tag">Live Google Map</span>
            </div>

            <div
            style={{
                width: "100%",
                height: "380px",
                borderRadius: "16px",
                overflow: "hidden",
            }}
            >
            {/* 핀 클릭 시 setSelectedMine 호출 */}
            <GoogleMapView onSelectMine={setSelectedMine} />
            </div>

            {/* 🔽 핀 클릭 후 선택된 지뢰 상태 표시 영역 */}
            {selectedMine ? (
            <div className="map-selected">
                <p className="map-selected-title">Selected mine status</p>
                <p>Time: {selectedMine.time}</p>
                <p>
                Latitude: {selectedMine.lat}, Longitude: {selectedMine.lng}
                </p>
                <p>Mine status: {selectedMine.status}</p>
                <p>Confidence level: {selectedMine.confidence}</p>
            </div>
            ) : (
            <p className="map-selected-empty">
                Click a pin on the map to view mine status.
            </p>
            )}
      </section>

  <TextLogPanel logs={dummyLogs} onSelectLog={setSelectedLog} />
</section>

    </div>
  );
}

// 상단 요약 스트립
function SummaryStrip({ summary }) {
  const { totalDistance, activeDrones, detectedMines, clearedMines } = summary;
  return (
    <div className="summary-strip">
      <div className="summary-item">
        <span className="summary-label">Total Distance</span>
        <span className="summary-value">{totalDistance}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Active Drones</span>
        <span className="summary-value">{activeDrones}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Detected Mines</span>
        <span className="summary-value">{detectedMines}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Cleared Mines</span>
        <span className="summary-value">{clearedMines}</span>
      </div>
    </div>
  );
}

// 텍스트 로그 패널
function TextLogPanel({ logs, onSelectLog }) {
  return (
    <section className="panel text-panel">
      <div className="panel-header">
        <h2>Text View</h2>
        <span className="panel-tag panel-tag-soft">Sorted by time</span>
      </div>

      <div className="log-list">
        {logs.map((log) => (
          <button
            key={log.id}
            className={
              "log-item" + (log.detected ? " log-item-detected" : "")
            }
            onClick={() => onSelectLog(log)}
          >
            <div className="log-main-line">
              <span className="log-time">{log.time}</span>
              <span className="log-coord">
                {log.lat.toFixed(4)}, {log.lng.toFixed(4)}
              </span>
            </div>
            <div className="log-meta-line">
              <span>Detected: {log.detected ? "Yes" : "No"}</span>
              <span>Status: {log.status}</span>
              <span>Confidence: {log.confidence}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────
   2페이지: Drone status & maintenance
   ───────────────────────────────── */

// 드론 상태 더미 데이터
// 드론 상태 더미 데이터 + 부품별 상세 정보
const drones = [
  {
    id: 1,
    name: "Drone 1",
    active: true,
    health: "Normal",
    battery: 87,
    maintenance: "Up to date",
    lastCheck: "2025-12-08 10:30",
    parts: [
      { name: "Propellers", status: "OK", detail: "No abnormal vibration detected." },
      { name: "Battery", status: "Good", detail: "132 charge cycles, temperature normal." },
      { name: "GPS module", status: "Stable", detail: "Signal strong, no drift reported." },
      { name: "Thermal camera", status: "Calibrated", detail: "Last calibration: 2025-12-01." },
    ],
  },
  {
    id: 2,
    name: "Drone 2",
    active: false,
    health: "Normal",
    battery: 54,
    maintenance: "Scheduled",
    lastCheck: "2025-12-07 16:10",
    parts: [
      { name: "Propellers", status: "OK", detail: "Minor dust accumulation." },
      { name: "Battery", status: "Warning", detail: "230 charge cycles, capacity slightly reduced." },
      { name: "GPS module", status: "Stable", detail: "Normal accuracy." },
      { name: "Thermal camera", status: "Check", detail: "Lens needs cleaning." },
    ],
  },
  {
    id: 3,
    name: "Drone 3",
    active: false,
    health: "Normal",
    battery: 100,
    maintenance: "Up to date",
    lastCheck: "2025-12-06 09:50",
    parts: [
      { name: "Propellers", status: "OK", detail: "Replaced 2 flights ago." },
      { name: "Battery", status: "Good", detail: "45 charge cycles." },
      { name: "GPS module", status: "Stable", detail: "No issues reported." },
      { name: "Thermal camera", status: "OK", detail: "Within normal temperature range." },
    ],
  },
];

// 지뢰 상태 더미 데이터
const mineStatusSummary = [
  { label: "Uncleared", count: 8 },
  { label: "Cleared", count: 7 },
  { label: "False positive", count: 3 },
];

function DroneStatusPage({ isAdmin }) {
  return (
    <div className="page page-drone">
      <header className="page-header">
        <div>
          <h1>Drone Status & Maintenance</h1>
          <p className="page-subtitle">
            Manage each drone's health, battery level, and maintenance schedule.
          </p>
        </div>

        {/* 나중에 드론 사진/아이콘 들어갈 자리 */}
        <div
          className="header-thumbnail header-thumbnail-drone"
          aria-label="Drone status illustration placeholder"
        >
          {/* <img src="..." alt="Drone status illustration" /> */}
          <span>Drone Overview</span>
        </div>
      </header>

      <section className="page-main-grid page-main-grid-drone">
        <DroneListPanel isAdmin={isAdmin} />
        <MineStatusPanel isAdmin={isAdmin} />
      </section>
    </div>
  );
}

// 드론 리스트 패널
// 드론 리스트 패널 + 상세 정보 패널
function DroneListPanel({ isAdmin }) {
  // 어떤 드론의 상세를 보고 있는지 상태
  const [selectedDrone, setSelectedDrone] = useState(null);

  return (
    <section className="panel drone-panel">
      <div className="panel-header">
        <h2>Drone Fleet</h2>
        <span className="panel-tag">{drones.length} drones (demo)</span>
      </div>

      {/* 드론 카드 리스트 */}
      <div className="drone-list">
        {drones.map((drone) => (
          <div key={drone.id} className="drone-card">
            <div className="drone-card-header">
              <img
                src={droneIllust}
                alt={`${drone.name} illustration`}
                className="drone-avatar-img"
              />
              <div>
                <p className="drone-name">{drone.name}</p>
                <p className="drone-status">
                  {drone.active ? "Active" : "Inactive"} · {drone.health}
                </p>
              </div>
              <span
                className={
                  "drone-chip " + (drone.active ? "drone-chip-on" : "drone-chip-off")
                }
              >
                {drone.active ? "LIVE" : "STANDBY"}
              </span>
            </div>

            <div className="drone-card-body">
              <div className="drone-meta">
                <span className="meta-label">Battery</span>
                <span className="meta-value">{drone.battery}%</span>
              </div>
              <div className="drone-meta">
                <span className="meta-label">Maintenance</span>
                <span className="meta-value">{drone.maintenance}</span>
              </div>
              <div className="drone-meta">
                <span className="meta-label">Last check</span>
                <span className="meta-value">{drone.lastCheck}</span>
              </div>
            </div>

            {/* Admin 기능은 나중에 실제 권한과 연동 */}
            <div className="drone-card-footer">
              <button
                className="ghost-button"
                type="button"
                onClick={() => setSelectedDrone(drone)}
              >
                View details
              </button>
              <button
                className="ghost-button ghost-button-primary"
                type="button"
                disabled={!isAdmin}
              >
                {isAdmin ? "Edit status" : "Admin only"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 아래쪽에 선택된 드론의 부품별 상세 정보 표시 */}
      {selectedDrone && (
        <div className="drone-detail-panel">
          <div className="drone-detail-header">
            <div>
              <p className="drone-detail-title">
                {selectedDrone.name} — component status
              </p>
              <p className="drone-detail-subtitle">
                Detailed health information for each hardware component.
              </p>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setSelectedDrone(null)}
            >
              Close
            </button>
          </div>

          <div className="drone-detail-table">
            <div className="drone-detail-row drone-detail-row-head">
              <span>Component</span>
              <span>Status</span>
              <span>Detail</span>
            </div>
            {selectedDrone.parts?.map((part, idx) => (
              <div key={idx} className="drone-detail-row">
                <span className="drone-detail-cell-name">{part.name}</span>
                <span className="drone-detail-cell-status">{part.status}</span>
                <span className="drone-detail-cell-detail">{part.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// 지뢰 상태 패널
function MineStatusPanel({ isAdmin }) {
  const totalMines = mineStatusSummary.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <section className="panel mine-panel">
      <div className="panel-header">
        <h2>Mine Status</h2>
        <span className="panel-tag panel-tag-soft">Filter by status</span>
      </div>

      <p className="mine-summary-text">
        Mines are grouped into three categories: Uncleared, Cleared, and False positive.
        Use this overview as a quick status check.
      </p>

      <div className="mine-summary-grid">
        {mineStatusSummary.map((item) => {
          const ratio =
            totalMines === 0 ? 0 : Math.round((item.count / totalMines) * 100);

          return (
            <div key={item.label} className="mine-card">
              <p className="mine-label">{item.label}</p>
              <p className="mine-count">{item.count}</p>
              <div className="mine-progress">
                <div
                  className={
                    "mine-progress-bar mine-progress-bar-" +
                    item.label.replace(" ", "-").toLowerCase()
                  }
                  style={{ width: `${ratio}%` }}
                />
              </div>
              <p className="mine-ratio">{ratio}% of tracked mines</p>
              <button
                className="ghost-button"
                type="button"
                disabled={!isAdmin}
              >
                {isAdmin
                  ? `View ${item.label.toLowerCase()}`
                  : "Admin only"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Dashboard;
