import { useState } from "react";
import axios from "axios";

function VaultCard({ item, onDelete }) {
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/vault/${item.id}`);
      onDelete(item.id); // update parent UI
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="vault-card">
      
      <div>
        <h3>{item.title}</h3>

        {/* 🔐 masked password */}
        <p>
          {show ? item.password : "••••••••"}
        </p>
      </div>

      <div>
        {/* 👁 toggle */}
        <button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>

        {/* 📋 copy */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(item.password);
            alert("Copied!");
          }}
        >
          Copy
        </button>

        {/* ❌ delete */}
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>

    </div>
  );
}

export default VaultCard;