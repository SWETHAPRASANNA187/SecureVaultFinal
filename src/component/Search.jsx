import { useState, useEffect } from "react";

function Search() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const vault = JSON.parse(localStorage.getItem("vault")) || [];
    setItems(vault);
  }, []);

  const filteredItems = items.filter((item) => {
    const text = search.toLowerCase();

    if (filter === "title") {
      return item.title.toLowerCase().includes(text);
    }

    if (filter === "description") {
      return item.description.toLowerCase().includes(text);
    }

    if (filter === "image") {
      return item.fileType && item.fileType.startsWith("image");
    }

    if (filter === "pdf") {
      return item.fileType && item.fileType.includes("pdf");
    }

    if (filter === "doc") {
      return item.fileType && item.fileType.includes("word");
    }

    // default = all
    return (
      item.title.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text) ||
      (item.fileName &&
        item.fileName.toLowerCase().includes(text))
    );
  });

  return (
    <div className="page-container">

      <h2 className="search-title">SEARCH VAULT</h2>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search files, titles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-dropdown"
      >
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="image">Images</option>
        <option value="pdf">PDF</option>
        <option value="doc">Documents</option>
      </select>

      {/* RESULTS */}
      <div className="vault-grid">
        {filteredItems.length === 0 ? (
          <p>No results found ❌</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="vault-item">

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="file-locked">
                🔒 {item.fileName}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Search;