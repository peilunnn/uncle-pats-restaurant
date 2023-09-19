import React from "react";
import Header from "./components/Header";
import UserView from "./components/UserView";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#222", color: "#eee", minHeight: "100vh" }}
    >
      <Header />
      <UserView />
    </div>
  );
}

export default App;
