import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./SignUp.css";

export default function SignUp({ onSwitchToLogin, onSignUpSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      localStorage.setItem("currentUser", JSON.stringify({ name, email }));

      setLoading(false);
      onSignUpSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* <h2>Sign Up</h2> */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Welcome</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="toggle-link" onClick={onSwitchToLogin}>Login</span>
      </p>
    </div>
  );
}
