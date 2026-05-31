import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddItem() {
  // 🔐 PROTECT PAGE
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [lockPass, setLockPass] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  // ✅ FINAL SUBMIT FUNCTION
  const handleAdd = async () => {
    if (!title || !desc || !lockPass || !file) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("password", lockPass);
    formData.append("file", file);

    try {
      await axios.post(
        "https://securevaultfinal.onrender.com/vault",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Stored securely 🔒");

      // ✅ reset form
      setTitle("");
      setDesc("");
      setLockPass("");
      setFile(null);

      // ✅ go back to vault
      navigate("/vault");

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="page-container">
      <div className="glass-panel add-box">

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px"
        }}>
          <h2>Add Secure Item</h2>

        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="password"
          placeholder="Set Password"
          value={lockPass}
          onChange={(e) => setLockPass(e.target.value)}
        />

        {/* 📂 FILE INPUT */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="btn btn-primary" onClick={handleAdd}>
          LOCK & STORE 🔒
        </button>

      </div>
    </div>
  );
}

export default AddItem;