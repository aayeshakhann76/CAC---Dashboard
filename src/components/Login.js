import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

function Login({ onLogin, onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save current user
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ name: user.displayName || "", email: user.email })
      );

      onLogin(); // go to Dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <h1>Customer Acquisition Cost Dashboard</h1>
        <p>Track your customer acquisition costs easily and efficiently. Get insights and more.</p>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome</h2>
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="login-btn">Login</button>

          {/* ✅ Move "New here?" inside the form and center */}
          <p className="signup-toggle">
            New here?{" "}
            <span className="toggle-link" onClick={onSwitchToSignUp}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
