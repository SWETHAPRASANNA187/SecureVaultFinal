import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [messages, setMessages] = useState([]);

  // 🔐 BLOCK NON-ADMIN
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      window.location.href = "/";
    }
  }, []);

  // 📩 FETCH CONTACT MESSAGES
  useEffect(() => {
    axios.get("http://localhost:3000/contact")
      .then(res => setMessages(res.data))
      .catch(err => console.log(err));
  }, []);

  // ❌ DELETE MESSAGE
  const deleteMsg = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contact/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
    } catch {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "900px" }}>
      <h2>Admin Panel 🔐</h2>

      {messages.map((msg) => (
        <div key={msg._id} className="glass-panel" style={{ marginBottom: "15px" }}>
          <h4>{msg.name}</h4>
          <p>{msg.email}</p>
          <p>{msg.message}</p>

          <button onClick={() => deleteMsg(msg._id)}>
            Delete ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;