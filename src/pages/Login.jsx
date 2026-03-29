import { useState } from "react";
import axios from "axios";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("false");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      setPage("dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  
  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>🔐 Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <div className="auth-link" onClick={() => setPage("register")}>
        Don’t have an account? <span>Register</span>
      </div>
    </div>
  </div>
);
}