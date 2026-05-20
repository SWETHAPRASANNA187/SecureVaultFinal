import { useState } from "react";

function VaultCard({ item, deleteItem }) {
  const [show, setShow] = useState(false);

  return (
    <div className="vault-card">
      <div>
        <h3>{item.title}</h3>

        <p>
          {show ? item.password : "••••••••"}
        </p>
      </div>

      <div>
        <button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>

        <button onClick={() => {
          navigator.clipboard.writeText(item.password);
          alert("Copied!");
        }}>
          Copy
        </button>

        <button className="delete-btn" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default VaultCard;