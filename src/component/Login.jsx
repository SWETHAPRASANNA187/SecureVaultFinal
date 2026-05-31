import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://securevaultfinal.onrender.com/login", {
        username: user,
        password: pass,
      });

      // ✅ STORE EVERYTHING
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", user);
      localStorage.setItem("role", res.data.role); // ⭐ IMPORTANT

      alert(res.data.message);

      // ✅ REDIRECT BASED ON ROLE
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch {
      alert("Invalid credentials ❌");
    }
  };

  // 🆕 REGISTER
  const handleRegister = async () => {
    try {
      const res = await axios.post("https://securevaultfinal.onrender.com/register", {
        username: user,
        password: pass,
      });

      alert(res.data.message);

    } catch {
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">

        <h2 className="login-title">SECURE ACCESS TERMINAL</h2>
        <p className="login-sub">Authentication Required</p>

        <form className="login-box" onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button type="submit">
            AUTHENTICATE
          </button>

          <button
            type="button"
            onClick={handleRegister}
            style={{ marginTop: "10px", background: "#555" }}
          >
            REGISTER
          </button>

        </form>

        <p className="login-note">
          Authorized users only • Secure encrypted access
        </p>

      </div>
    </div>
  );
}

export default Login;