import React from "react";
import Header from "./components/Header";
import Quote from "./components/Quote";
import HabitList from "./components/HabitList";
import "./index.css";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Quote />
      <HabitList />
    </div>
  );
}

export default App;
