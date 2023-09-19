import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#222", color: "#eee", minHeight: "100vh" }}
    >
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<UserView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
