import { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [enteredPass, setEnteredPass] = useState("");
  const [unlockedIndex, setUnlockedIndex] = useState(null);
  const [error, setError] = useState("");

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchVault = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/vault", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setItems(res.data);
      } catch (err) {
        console.log(err);
        alert("Error loading vault ❌");
      }
    };

    fetchVault();
  }, []);

  // ✅ FILTER
  const filteredItems = items
    .filter((item) => {
      const searchText = query.toLowerCase();

      const matchesText =
        item.title.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      const extension = item.fileName?.split(".").pop().toLowerCase();

      if (filterType === "all") return matchesText;
      if (filterType === "image")
        return matchesText && ["jpg", "jpeg", "png"].includes(extension);
      if (filterType === "pdf")
        return matchesText && extension === "pdf";

      return matchesText;
    })
    .sort((a, b) => {
      if (filterType === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  // ✅ UNLOCK LOGIC
  const handleUnlock = (index) => {
    if (enteredPass === items[index].password) {
      setUnlockedIndex(index);
      setError("");
    } else {
      setError("Wrong password ❌");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "1000px" }}>

      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Search Vault 🔍</h2>
        <p style={{ fontSize: "12px", opacity: 0.7 }}>
          Logged in as: {localStorage.getItem("user")}
        </p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {/* FILTER */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="filter-dropdown"
      >
        <option value="all">All</option>
        <option value="image">Images</option>
        <option value="pdf">PDF</option>
        <option value="recent">Recent</option>
      </select>

      {/* RESULTS */}
      {filteredItems.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: "center" }}>
          No items found
        </div>
      ) : (
        <div className="vault-grid">
          {filteredItems.map((item, index) => (
            <div key={item._id} className="vault-item">

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {/* 🔒 LOCKED */}
              {unlockedIndex !== index && (
                <div
                  className="file-locked"
                  onClick={() => {
                    setSelectedIndex(index);
                    setEnteredPass("");
                    setError("");
                  }}
                >
                  🔒 {item.fileName}
                </div>
              )}

              {/* 🔑 PASSWORD INPUT */}
              {selectedIndex === index && unlockedIndex !== index && (
                <div className="unlock-box">
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={enteredPass}
                    onChange={(e) => setEnteredPass(e.target.value)}
                  />

                  <button onClick={() => handleUnlock(index)}>
                    UNLOCK
                  </button>

                  {error && <p className="error-text">{error}</p>}
                </div>
              )}

              {/* 🔓 UNLOCKED */}
              {unlockedIndex === index && (
                <>
                  {/* IMAGE */}
                  {item.fileName?.match(/\.(jpg|jpeg|png)/i) && (
                    <img
                      src={`data:${item.fileType};base64,${item.fileData}`}
                      alt="preview"
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

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;