import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = () => {
    setOpen(true);

    // ⏳ small delay for animation
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="front-container">

      <p className="top-text">
        Advanced Protection for Your Confidential Data
      </p>

      <h1 className="main-title">
        <span>SECURE</span>

        <div className="middle-row">
          <div
            className={`lock ${open ? "unlock" : ""}`}
            onClick={handleUnlock}
          >
            {open ? "🔓" : "🔒"}
          </div>

          <p className="hint-text">
            Tap to unlock secure access
          </p>
        </div>

        <span>VAULT</span>
      </h1>

      {open && <p className="access-text">ACCESS GRANTED...</p>}
    </div>
  );
}

export default FrontPage;