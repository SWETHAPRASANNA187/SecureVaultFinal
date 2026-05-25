import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Vault() {
  if (!localStorage.getItem("token")) {
  window.location.href = "/";
}
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [enteredPass, setEnteredPass] = useState("");
  const [unlockedIndex, setUnlockedIndex] = useState(null);
  const [error, setError] = useState("");
  const [previewItem, setPreviewItem] = useState(null);

  // ✅ FETCH USER-SPECIFIC DATA
  useEffect(() => {
  const fetchVault = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:3000/vault",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      setItems(res.data);

    } catch (err) {
      console.log(err);
      alert("Error loading vault ❌");
    }
  };

  fetchVault();
}, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
  await axios.delete(`http://127.0.0.1:3000/vault/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });

  setItems(items.filter(item => item._id !== id));
};

  // ✅ UNLOCK
  const handleUnlock = (index) => {
    if (enteredPass === items[index].password) {
      setUnlockedIndex(index);
      setError("");
    } else {
      setError("Access Denied ❌");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "1000px" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem"
      }}>
        <h2>My Vault 🔐</h2>

        <button onClick={() => navigate("/add")}>
          + Add New
        </button>
      </div>

      {/* EMPTY */}
      {items.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Your vault is empty.</p>
          <button onClick={() => navigate("/add")}>
            Store First Item
          </button>
        </div>
      ) : (
        <div className="vault-grid">
          {items.map((item, index) => (
            <div key={item._id} className="vault-item">

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {/* 🔒 LOCKED */}
              {unlockedIndex !== index && (
                <div onClick={() => setSelectedIndex(index)}>
                  🔒 {item.fileName}
                </div>
              )}

              {/* 🔑 PASSWORD */}
              {selectedIndex === index && unlockedIndex !== index && (
                <div>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={enteredPass}
                    onChange={(e) => setEnteredPass(e.target.value)}
                  />

                  <button onClick={() => handleUnlock(index)}>
                    UNLOCK
                  </button>

                  {error && <p>{error}</p>}
                </div>
              )}

              {/* 🔓 UNLOCKED */}
              {unlockedIndex === index && (
                <>
                  {/* IMAGE */}
                  {item.fileName?.match(/\.(jpg|jpeg|png)/i) && (
                    <img
                      src={`data:${item.fileType};base64,${item.fileData}`}
                      alt="vault"
                      style={{ width: "100%" }}
                    />
                  )}

                  {/* DOWNLOAD */}
                  <a
                    href={`data:${item.fileType};base64,${item.fileData}`}
                    download={item.fileName}
                  >
                    Download File
                  </a>
                </>
              )}

              <button onClick={() => handleDelete(item._id)}>
                Remove
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vault; 

