'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css'; 

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/buildings'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Por favor complete os campos abaixo</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="login-input"
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Logar
          </button>
          <div className="login-links">
            <button type="button" className="login-link">
              Alterar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
