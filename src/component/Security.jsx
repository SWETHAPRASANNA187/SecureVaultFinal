function Security() {
  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: '800px', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center' }}>Security Features</h2>
      <p style={{ textAlign: 'center', marginBottom: '3rem' }}>Learn how SecureVault protects your data.</p>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Local Storage Encryption</h3>
        <p>All your data is stored locally on your device within your browser's Local Storage. We never transmit your vault data to any external servers, ensuring maximum privacy.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Zero-Knowledge Architecture</h3>
        <p>Because the application runs entirely on the client side, we have zero knowledge of what you store. Only you have access to the information you keep in SecureVault.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ color: 'var(--primary-color)' }}>Modern Browser Security</h3>
        <p>We leverage modern browser security standards including Content Security Policy (CSP) and strict origin isolation to prevent malicious scripts from accessing your vault data.</p>
      </div>
    </div>
  );
}

export default Security;