"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.background = dark ? '#222' : '#fff';
    document.body.style.color = dark ? '#fff' : '#222';
  }, [dark]);

  return (
    <div style={{
      maxWidth: 500,
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      background: dark ? '#222' : '#fff',
      textAlign: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: 'none',
          background: dark ? '#444' : '#eee',
          color: dark ? '#fff' : '#222',
          cursor: 'pointer'
        }}
      >
        {dark ? '🌙 Dark' : '☀️ Light'}
      </button>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748', fontSize: '2.2rem' }}>Student Registry</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ margin: '1rem 0' }}>
          <a href="/post-student" style={linkStyle}>➕ Add Student</a>
        </li>
        <li style={{ margin: '1rem 0' }}>
          <a href="/get-students" style={linkStyle}>📋 View Students</a>
        </li>
        <li style={{ margin: '1rem 0' }}>
          <a href="/edit-student" style={linkStyle}>✏️ Edit Student</a>
        </li>
        <li style={{ margin: '1rem 0' }}>
          <a href="/delete-student" style={linkStyle}>🗑️ Delete Student</a>
        </li>
      </ul>
    </div>
  );
}

const linkStyle = {
  display: 'inline-block',
  padding: '0.75rem 2rem',
  borderRadius: '8px',
  background: '#3182ce',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1.1rem',
  transition: 'background 0.2s',
  boxShadow: '0 2px 8px rgba(49,130,206,0.08)',
};

