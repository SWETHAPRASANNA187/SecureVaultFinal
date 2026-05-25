function Security() {
  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '800px', textAlign: 'left' }}>
      
      <h2 style={{ textAlign: 'center' }}>Security Features</h2>
      <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Learn how SecureVault protects your data.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Backend Data Storage</h3>
        <p>
          All your data is securely stored using a backend server (Node.js & Express). 
          This ensures better data management and controlled access instead of relying on browser storage.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Authentication System</h3>
        <p>
          Users must log in with valid credentials to access the vault. 
          Unauthorized access is restricted through backend validation.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Secure API Communication</h3>
        <p>
          All operations such as adding, viewing, and deleting data are performed 
          through secure API endpoints, ensuring controlled and structured data handling.
        </p>
      </div>

    </div>
  );
}

export default Security;