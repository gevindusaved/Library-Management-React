import React, { useState } from "react";
import Books from "../Books/Books";
import Members from "../Members/Members";
import BorrowRecords from "../BorrowRecords/BorrowRecords";
import "./css/Home.css";


const Home = () => {
  const [activeFeature, setActiveFeature] = useState("home");

  const renderFeature = () => {
    switch (activeFeature) {
      case "books":
        return <Books/>;
      case "members":
        return <Members/>;
      case "borrowRecords":
        return <BorrowRecords/>;
      default:
        return <Books/>;
    }
  };

  return (
    <div className="app-main">
      <header className="navbar-container">
        <div className="nav-logo">Library Management System</div>
        <nav className="navbar-panel">
          <div className="nav-pannel-container">
            <button
              className="nav-links"
              onClick={() => setActiveFeature("books")}
            >
              Home
            </button>
            <button
              className="nav-links"
              onClick={() => setActiveFeature("members")}
            >
              Members
            </button>
            <button
              className="nav-links"
              onClick={() => setActiveFeature("borrowRecords")}
            >
              Borrow Records
            </button>
          </div>
        </nav>{" "}
        <div className="nav-profile-logo-container"></div>
      </header>
      <main className="main-content"> {renderFeature()} </main>
    </div>
  );
};

export default Home;
