import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user || !pass) {
      alert("Enter all fields");
      return;
    }

    // allow login
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="login-content"> {/* 👈 ADD THIS WRAPPER */}

        <h2 className="login-title">SECURE ACCESS TERMINAL</h2>

        <p className="login-sub">
          Authentication Required
        </p>

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

          <button type="submit">AUTHENTICATE</button>
        </form>

        <p className="login-note">
          Authorized users only • Secure encrypted access
        </p>

      </div>

    </div>
  );
}

export default Login;