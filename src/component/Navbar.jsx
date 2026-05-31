import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // optional backend logout
      await axios.post("https://securevaultfinal.onrender.com/logout");

      // clear frontend auth (if you store anything later)
      localStorage.clear();

      alert("Logged out successfully 👋");

      navigate("/login");
    } catch (err) {
      console.log(err);
      navigate("/login"); // fallback
    }
  };

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
<h1 className="logo">SecureVault</h1>      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Add Item</Link>
        <Link to="/vault">My Vault</Link>
        <Link to="/search">Search</Link>

        {/* 🔥 changed logout */}
        <button
          onClick={handleLogout}
          className="btn btn-danger"
          style={{ padding: "0.4rem 1rem", marginLeft: "1rem" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;