function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer glass-panel">
      <p>&copy; {currentYear} SecureVault. All rights reserved.</p>
    </footer>
  );
}

export default Footer;