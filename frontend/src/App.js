import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TokenDetail from "./pages/TokenDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/token/:id" element={<TokenDetail />} />
    </Routes>
  );
};

export default App;
