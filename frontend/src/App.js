import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
