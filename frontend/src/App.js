import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TokenPage from "./pages/tokenPage/tokenPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/token" element={<TokenPage />} />
    </Routes>
  );
};

export default App;
