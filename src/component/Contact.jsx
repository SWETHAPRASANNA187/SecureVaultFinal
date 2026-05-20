import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }
    
    // Simulate sending
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="page-container glass-panel animate-fade-in" style={{ maxWidth: '600px' }}>
      <h2>Contact Us</h2>
      <p style={{ marginBottom: '2rem' }}>Have questions? Send us a message.</p>

      {submitted && (
        <div style={{ background: 'var(--success-color)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea 
            className="form-control" 
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help you?"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;