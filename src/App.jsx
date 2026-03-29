import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const token = localStorage.getItem("token");

  if (token && page === "login") {
  return <Dashboard setPage={setPage} />;
}

  if (page === "register") return <Register setPage={setPage} />;
  if (page === "dashboard" && token) return <Dashboard setPage={setPage} />;

  return <Login setPage={setPage} />;
}

export default App;