import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Vault() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [enteredPass, setEnteredPass] = useState("");
  const [unlockedIndex, setUnlockedIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const vault = JSON.parse(localStorage.getItem("vault")) || [];
    setItems(vault);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);
    localStorage.setItem("vault", JSON.stringify(updatedItems));
  };
  const handleUnlock = (index) => {
    if (enteredPass === items[index].password) {
      setUnlockedIndex(index);
      setError("");
    } else {
      setError("Access Denied ❌");
    }
  };
  return (
    <div
      className="page-container animate-fade-in"
      style={{ maxWidth: "1000px" }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2>My Vault</h2>

        <button
          className="btn glass-panel"
          onClick={() => navigate("/add")}
        >
          + Add New
        </button>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div
          className="glass-panel"
          style={{ padding: "3rem", textAlign: "center" }}
        >
          <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
            Your vault is empty.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/add")}
          >
            Store First Item
          </button>
        </div>
      ) : (
        <div className="vault-grid">
          {items.map((item, index) => (
            <div key={index} className="vault-item glass-panel">

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {/* 🔐 FILE NAME (INITIAL VIEW) */}
              {unlockedIndex !== index && (
                <div
                  className="file-locked"
                  onClick={() => setSelectedIndex(index)}
                >
                  🔒 {item.fileName}
                </div>
              )}

              {/* 🔑 PASSWORD INPUT */}
              {selectedIndex === index && unlockedIndex !== index && (
                <div className="unlock-box">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={enteredPass}
                    onChange={(e) => setEnteredPass(e.target.value)}
                  />

                  <button onClick={() => handleUnlock(index)}>
                    UNLOCK
                  </button>

                  {error && <p className="error-text">{error}</p>}
                </div>
              )}

              {/* 🔓 UNLOCKED VIEW */}
              {unlockedIndex === index && (
                <>
                  {item.fileType && item.fileType.startsWith("image") && (
                    <img
                      src={item.fileData}
                      alt="vault"
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                  )}

                  <a href={item.fileData} download={item.fileName}>
                    Download File
                  </a>
                </>
              )}

              <button
                className="btn btn-danger"
                style={{ width: "100%", marginTop: "10px" }}
                onClick={() => handleDelete(index)}
              >
                Remove from Vault
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vault;