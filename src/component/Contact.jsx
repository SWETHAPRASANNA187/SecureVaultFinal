import { useState } from "react";
  import axios from "axios"; 


function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !message) {
    alert("All fields are required");
    return;
  }

  try {
    await axios.post("http://127.0.0.1:3000/contact", {
      name,
      email,
      message
    });

    alert("Message sent & stored ✅");

    setName("");
    setEmail("");
    setMessage("");

  } catch (err) {
    console.log(err);
    alert("Error sending message ❌");
  }
};

  return (
    <div className="page-container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      
      <div className="glass-panel contact-box" style={{
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        
        <h2>Contact Us</h2>
        <p style={{ marginBottom: "20px" }}>
          Have questions? Reach out to us anytime.
        </p>

        <form 
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
          />

          <button className="btn btn-primary" type="submit">
            SEND MESSAGE 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;