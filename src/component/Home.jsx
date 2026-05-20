import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <div className="hero">
        <h1>🔐 SecureVault</h1>
        <p>Your Digital World, Secured</p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Home;