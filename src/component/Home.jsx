import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      // 🔥 check backend is running
      await axios.get("http://localhost:3000/");

      // if OK → go to login
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Backend server not running ❌");
    }
  };

  return (
    <div className="home">

      <div className="hero">
        <h1>🔐 SecureVault</h1>
        <p>Your Digital World, Secured</p>

        <button onClick={handleStart}>
          Get Started
        </button>
      </div>

    </div>
  );
}

export default Home;