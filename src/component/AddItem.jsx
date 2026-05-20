import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [success, setSuccess] = useState(false);
  const [lockPass, setLockPass] = useState("");
  const [askPass, setAskPass] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleAdd = () => {


    if (!file) {
      alert("Please select a file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const newItem = {
        title,
        description: desc,
        password: lockPass,
        fileName: file.name,
        fileType: file.type,
        fileData: reader.result, // 🔥 base64 data
      };

      const vault = JSON.parse(localStorage.getItem("vault")) || [];
      vault.push(newItem);
      localStorage.setItem("vault", JSON.stringify(vault));

      setSuccess(true);
    };

    reader.readAsDataURL(file); // convert file → base64
  };
  const handleLockClick = () => {


    setAskPass(true); // show password field
  };

  return (
    <div className="add-container">

      <div className="add-box">

        <h2 className="add-title">DATA ENTRY TERMINAL</h2>

        <p className="add-sub">
          Insert confidential data into secure vault
        </p>

        <form onSubmit={(e) => e.preventDefault()}>

          <div className="form-row-container">
            <input type="text" placeholder="Enter Title" className="add-box" />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {askPass && (
            <input
              type="password"
              placeholder="Set Lock Password"
              value={lockPass}
              onChange={(e) => setLockPass(e.target.value)}
            />
          )}

          <div
            className={`lock-submit ${success ? "locked" : ""}`}
            onClick={askPass ? handleAdd : handleLockClick}
          >
            <span className="lock-icon">
              {success ? "🔒" : "🔓"}
            </span>

            <p>
              {success
                ? "Data Secured ✅"
                : askPass
                  ? "Tap to Confirm Lock"
                  : "Tap to Secure Data"}
            </p>
          </div>

        </form>

      </div>

    </div>
  );
}

export default AddItem;