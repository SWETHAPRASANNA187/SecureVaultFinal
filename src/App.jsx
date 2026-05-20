import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// Pages
import FrontPage from "./component/FrontPage";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import AddItem from "./component/AddItem";
import Vault from "./component/Vault";
import Search from "./component/Search";
import Stats from "./component/Stats";
import Security from "./component/Security";
import Contact from "./component/Contact";

function Layout() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className="app-container">
      {!hideNavFooter && <Navbar />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/security" element={<Security />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!hideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;