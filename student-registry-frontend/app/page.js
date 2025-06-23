"use client";
import { useState, useEffect } from "react";
import "../app/globals.css";

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark ? "#18181b" : "#f4f6fb";
    document.body.style.color = dark ? "#f3f4f6" : "#22223b";
  }, [dark]);

  return (
    <div>
      <div
        className="main-card"
        style={{
          background: dark ? "#232336" : "#fff",
          color: dark ? "#f3f4f6" : "#22223b",
          boxShadow:
            dark ? "0 4px 24px rgba(0,0,0,0.32)" : "0 4px 24px rgba(0,0,0,0.08)",
          border: dark ? "1px solid #232336" : "1px solid #e5e7eb",
        }}
      >
        <button
          onClick={() => setDark((d) => !d)}
          style={{
            float: "right",
            marginBottom: 24,
            background: dark ? "#2563eb" : "#e0e7ef",
            color: dark ? "#fff" : "#22223b",
            border: "none",
            borderRadius: 8,
            padding: "0.4rem 1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          {dark ? "Dark Mode" : "Light Mode"}
        </button>
        <h1>Student Registry</h1>
        <nav>
          <a href="/post-student">
            <button
              className="nav-btn"
              style={{
                background: dark ? "#2563eb" : "#2563eb",
                color: "#fff",
              }}
            >
              Add Student
            </button>
          </a>
          <a href="/get-students">
            <button
              className="nav-btn"
              style={{
                background: dark ? "#2563eb" : "#2563eb",
                color: "#fff",
              }}
            >
              View Students
            </button>
          </a>
          <a href="/edit-student">
            <button
              className="nav-btn"
              style={{
                background: dark ? "#2563eb" : "#2563eb",
                color: "#fff",
              }}
            >
              Edit Student
            </button>
          </a>
          <a href="/delete-student">
            <button
              className="nav-btn"
              style={{
                background: dark ? "#2563eb" : "#2563eb",
                color: "#fff",
              }}
            >
              Delete Student
            </button>
          </a>
        </nav>
      </div>
    </div>
  );
}

