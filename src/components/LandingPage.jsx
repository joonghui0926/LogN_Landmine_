import React, { useEffect, useState } from "react";
import "./LandingPage.css";

// assets (src/assets)
import heroMp4 from "../assets/reduced3.mp4";

import a1 from "../assets/a1.png";
import unoda from "../assets/UNODA.png";

import flyingGif from "../assets/flying.gif";
import markingGif from "../assets/marking.gif";
import f4 from "../assets/f4.png";

import l2 from "../assets/l2.jpg";
import l3 from "../assets/l3.jpg";
import l4 from "../assets/l4.jpg";

export default function LandingPage({ onEnterDashboard }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lp-root">
      {/* NAV */}
      <nav className={`lp-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="lp-container lp-nav-inner">
          <a
            className="lp-brand"
            href="#top"
            onClick={(e) => handleAnchor(e, "top")}
          >
            Safestep Initiatvie <span className="lp-dot" />
          </a>

          <div className="lp-nav-right">
            <div className="lp-links">
              <a className="lp-link" href="#about" onClick={(e) => handleAnchor(e, "about")}>
                About
              </a>
              <a className="lp-link" href="#workflow" onClick={(e) => handleAnchor(e, "workflow")}>
                Workflow
              </a>
              <a className="lp-link" href="#highlights" onClick={(e) => handleAnchor(e, "highlights")}>
                Highlights
              </a>
              <a className="lp-link" href="#contact" onClick={(e) => handleAnchor(e, "contact")}>
                Contact
              </a>
            </div>

            {/* 상단바 try now 버튼 (lp-try) */}
            <button
              type="button"
              className="lp-btn lp-try"
              onClick={onEnterDashboard}
            >
              Try now
            </button>
          </div>
        </div>
      </nav>

      {/* HERO (첫 페이지 크기 유지) */}
      <section className="lp-hero" id="top">
        <div className="lp-hero-video" aria-hidden="true">
          <video className="lp-hero-video-media" autoPlay muted loop playsInline preload="auto">
            <source src={heroMp4} type="video/mp4" />
          </video>
        </div>

        <div className="lp-container lp-hero-inner">
          <h1 className="lp-h1">
            Safestep <span className="lp-grad-text">Initiative</span>
          </h1>
          <p className="lp-lead">
            Drone-powered landmine detection and marking with UN Office for Disarmament Affairs.
          </p>

          <div className="lp-hero-actions">
            <a
              href="#about"
              className="lp-btn lp-btn-primary"
              onClick={(e) => handleAnchor(e, "about")}
            >
              Learn More
            </a>

            <button
              type="button"
              className="lp-btn lp-btn-ghost"
              onClick={onEnterDashboard}
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* 아래부터는 75% 스케일 (요청사항) */}
      <main className="lp-after-hero">
        {/* ABOUT */}
        <section id="about" className="lp-section">
          <div className="lp-container">
            <div className="lp-row">
              <div className="lp-col lp-col-text">
                <span className="lp-kicker">About the Project</span>
                <h2 className="lp-section-title">Drone detection, on-site marking, live coordination</h2>
                <p className="lp-lead-tight">
                  <strong>Project Landmine</strong> combines drone-based sensing, real-time mapping, and autonomous
                  coordination to make demining operations safer and more efficient where human access is risky.
                  Using <strong>metal and Hall-effect sensors</strong>, the drone detects buried landmines and drops a{" "}
                  <strong>dome marker</strong> that emits light and sound.
                </p>
                <p className="lp-lead-tight">
                  Upon completion and extensive testing this technology is aimed to be integrated in parts of{" "}
                  <strong>Egpyt and Cambodia</strong>
                </p>
              </div>

              <div className="lp-col lp-col-media">
                <div className="lp-img-frame">
                  <img className="lp-img" src={a1} alt="Drone & dome marker" />
                </div>
              </div>
            </div>

            {/* UNODA */}
            <div className="lp-row lp-row-reverse lp-mt-lg">
              <div className="lp-col lp-col-media">
                <div className="lp-img-frame">
                  <img className="lp-img" src={unoda} alt="United Nations Office for Disarmament Affairs" />
                </div>
              </div>

              <div className="lp-col lp-col-text">
                <span className="lp-kicker">Client & Partnership</span>
                <h2 className="lp-section-title">United Nations Office for Disarmament Affairs (UNODA)</h2>
                <p className="lp-lead-tight">
                  The <strong>United Nations Office for Disarmament Affairs (UNODA)</strong> serves as the global
                  leader in promoting disarmament and advancing international peace and security. Through its various
                  programs, it supports the safe elimination of landmines and other explosive remnants of war.
                </p>
                <p className="lp-lead-tight">
                  <strong>Landmine</strong> collaborates closely with UNODA to align with humanitarian mine action
                  standards, enhance field data reliability, and ensure the technology is field-ready for deployment in
                  post-conflict regions.
                </p>
              </div>
            </div>

            <hr className="lp-hr-soft" />

            {/* WORKFLOW */}
            <div id="workflow" className="lp-workflow">
              <div className="lp-workflow-head">
                <span className="lp-kicker">Features</span>
                <h3 className="lp-section-title lp-mt-xs">Autonomous Detection and Coordination</h3>
                <p className="lp-lead-tight lp-center" style={{ maxWidth: 720 }}>
                  Each mission flows through three steps — scanning, marking, and coordinating via the live dashboard.
                </p>
              </div>

              {/* Step 1 */}
              <div className="lp-work-row">
                <div className="lp-work-media lp-img-frame">
                  <img src={flyingGif} alt="Aerial scanning" />
                </div>

                <div className="lp-work-text">
                  <span className="lp-step-kicker">
                    <span className="lp-step-num">1</span> Scan &amp; Detect
                  </span>
                  <h4 className="lp-work-title">Autonomous aerial sweep &amp; field sensing</h4>
                  <p className="lp-work-copy">
                    Each drone is a modular quadcopter (450 – 550 class) equipped with a Pixhawk-based flight
                    controller, GPS, and a custom metal-detection payload. Operating at low altitude, it scans target
                    corridors using Hall-effect and induction sensors that recognize tiny magnetic variations produced
                    by buried metals.
                  </p>
                  <ul className="lp-bullets">
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Precision platform:</strong> 450–550 mm quad frame, 2212 motors, and 9–12 inch propellers
                      for stable lift and long endurance.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Smart control:</strong> ArduPilot-compatible flight computer with auto-survey, geo-fencing,
                      and servo control for marker release.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Metal-detection unit:</strong> ESP32-driven coil sensor with LED / buzzer feedback
                      proportional to metal proximity.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Data link:</strong> GPS + LTE modules transmit {"{time, lat, lon, alt, signal strength}"}{" "}
                      to the web server for live visualization.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="lp-work-row lp-reverse">
                <div className="lp-work-media lp-img-frame">
                  <img src={markingGif} alt="Dome marker deployment" />
                </div>

                <div className="lp-work-text">
                  <span className="lp-step-kicker">
                    <span className="lp-step-num">2</span> Mark with Dome
                  </span>
                  <h4 className="lp-work-title">Autonomous pin-drop and field signaling</h4>
                  <p className="lp-work-copy">
                    Once a detection event exceeds the confidence threshold, the UAV automatically triggers a servo-based
                    release to drop a lightweight <strong>dome marker</strong> directly above the suspected location. The
                    dome emits a bright LED ring and audible pulse, helping ground crews identify the precise site from a
                    safe distance even in low-visibility environments.
                  </p>
                  <ul className="lp-bullets">
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Servo-driven dropper:</strong> 3D-printed cam-slot mechanism using a metal-gear servo
                      (MG996R/DS3218) for reliable single-pin release.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Guided deployment:</strong> Triggered only when altitude and attitude are stable, verified
                      via FC IMU and barometric data.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Signal module:</strong> Integrated LED and buzzer system that increases brightness and tone
                      frequency as teams approach.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="lp-work-row">
                <div className="lp-work-media lp-img-frame">
                  <img src={f4} alt="Live dashboard" />
                </div>

                <div className="lp-work-text">
                  <span className="lp-step-kicker">
                    <span className="lp-step-num">3</span> Coordinate in Real-time
                  </span>
                  <h4 className="lp-work-title">Live mission control &amp; collaborative web dashboard</h4>
                  <p className="lp-work-copy">
                    The live web dashboard acts as the mission’s command center — synchronizing every drone, marker, and
                    operator in real time. As data streams in from the field, the interface updates dynamically, allowing
                    teams to monitor scan coverage, confirm detections, and plan the next flight routes instantly.
                  </p>
                  <ul className="lp-bullets">
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Interactive live map:</strong> displays drone positions, detected zones, and safety corridors
                      in real time.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Team coordination tools:</strong> role-based access for supervisors, pilots, and analysts with
                      shared session updates.
                    </li>
                    <li>
                      <span className="lp-badge-dot" />
                      <strong>Instant data sync:</strong> events are automatically logged and visualized across connected
                      devices via the web app.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="lp-section lp-section-alt">
          <div className="lp-container">
            <div className="lp-workflow-head">
              <span className="lp-kicker">Highlights</span>
              <h3 className="lp-section-title lp-mt-xs">Highlights</h3>
            </div>

            {/* Technology */}
            <div className="lp-tile lp-mt-lg">
              <div className="lp-row">
                <div className="lp-col lp-col-media">
                  <div className="lp-img-frame">
                    <img className="lp-img" src={l2} alt="Sensors & data stream" />
                  </div>
                </div>
                <div className="lp-col lp-col-text">
                  <h3 className="lp-section-title lp-mt-xs">From sensors to live map</h3>
                  <p className="lp-lead-tight">
                    Drone-mounted <strong>metal and Hall sensors</strong> detect buried/surface landmines. Signals become
                    structured events and <strong>CSV flight logs</strong> for traceable records.
                  </p>
                  <p className="lp-lead-tight">
                    A <strong>Flask</strong> backend processes data in real time and visualizes it on a <strong>Folium map</strong>{" "}
                    for instant geolocation feedback and route suggestions.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="lp-tile lp-mt-lg">
              <div className="lp-row lp-row-reverse">
                <div className="lp-col lp-col-media">
                  <div className="lp-img-frame">
                    <img className="lp-img" src={l3} alt="Field deployment" />
                  </div>
                </div>
                <div className="lp-col lp-col-text">
                  <h3 className="lp-section-title lp-mt-xs">Built for real operations</h3>
                  <p className="lp-lead-tight">
                    Under <strong>UNODA sponsorship</strong>, the platform enhances speed, accuracy, and safety in humanitarian
                    demining.
                  </p>
                  <p className="lp-lead-tight">
                    It improves detection efficiency and provides <strong>shared situational awareness</strong> across teams—reducing
                    redundancy and risk.
                  </p>
                </div>
              </div>
            </div>

            {/* Scalability */}
            <div className="lp-tile lp-mt-lg">
              <div className="lp-row">
                <div className="lp-col lp-col-media">
                  <div className="lp-img-frame">
                    <img className="lp-img" src={l4} alt="Scalability & multi-Drone integration" />
                  </div>
                </div>
                <div className="lp-col lp-col-text">
                  <h3 className="lp-section-title lp-mt-xs">Scalable and Modular System</h3>
                  <p className="lp-lead-tight">
                    The <strong>Project Landmine</strong> is designed for effortless scalability — from a single drone test setup to
                    large, coordinated fleets operating across different regions.
                  </p>
                  <p className="lp-lead-tight">
                    Its modular architecture enables teams to easily <strong>add or remove drone units</strong>, adjust coverage zones,
                    and connect to existing <strong>cloud dashboards</strong> or field control systems with minimal configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="lp-section lp-contact">
          <div className="lp-container lp-center">
            <span className="lp-kicker">Get in Touch</span>
            <h2 className="lp-section-title">Contact</h2>
            <p className="lp-lead-tight" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              For inquiries about Landmine, reach us by email or leave a message below.
            </p>

            {/* Contact의 “Try dashboard” → className="lp-btn lp-btn-ghost" */}
            <div className="lp-contact-cta">
              <button
                type="button"
                className="lp-btn lp-btn-ghost"
                onClick={onEnterDashboard}
              >
                Try dashboard
              </button>

            </div>

            <form className="lp-form" onSubmit={(e) => e.preventDefault()}>
              <div className="lp-field">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="lp-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="lp-field">
                <label>Message</label>
                <textarea rows={4} placeholder="Write your message..." required />
              </div>

              <button type="submit" className="lp-btn lp-btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
