import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Link to="/dashboard">SecureVault</Link>
      </div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Add Item</Link>
        <Link to="/vault">My Vault</Link>
        <Link to="/search">Search</Link>
        <Link to="/login" className="btn btn-danger" style={{ padding: '0.4rem 1rem', marginLeft: '1rem' }}>Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;