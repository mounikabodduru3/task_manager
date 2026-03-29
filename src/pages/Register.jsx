import { useState } from "react";
import axios from "axios";

export default function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { name, email, password }
      );

      alert("Registered successfully");
      setPage("login");

    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

 return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>📝 Register</h2>

      <input
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      <div className="auth-link" onClick={() => setPage("login")}>
        Already have an account? <span>Login</span>
      </div>
    </div>
  </div>
);
}