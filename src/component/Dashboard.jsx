import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    { title: "Add Item", desc: "Store new confidential information", path: "/add" },
    { title: "My Vault", desc: "View and manage your stored items", path: "/vault" },
    { title: "Search", desc: "Quickly find specific items", path: "/search" },
    { title: "Stats", desc: "Overview of your vault contents", path: "/stats" },
    { title: "Security", desc: "Learn about our security features", path: "/security" },
    { title: "Contact", desc: "Get in touch with support", path: "/contact" }
  ];
  const cards = [
    { title: "Add Item", desc: "Store secure data", icon: "➕", path: "/add" },
    { title: "My Vault", desc: "View stored items", icon: "📂", path: "/vault" },
    { title: "Search", desc: "Find data quickly", icon: "🔍", path: "/search" },
    { title: "Stats", desc: "Usage insights", icon: "📊", path: "/stats" },
    { title: "Security", desc: "System protection", icon: "🛡️", path: "/security" },
    { title: "Contact", desc: "Get support", icon: "📡", path: "/contact" },
  ];

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '1000px' }}>
      <h1 className="dashboard-title">SECURE DASHBOARD</h1>      <p className="welcome-text">
        Welcome back, <span>Agent!</span>
      </p>
      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;