import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Books from "../Books/Books";
import Members from "../Members/Members";
import BorrowRecords from "../BorrowRecords/BorrowRecords";
import "./css/Home.css";

// Home screen content
const HomeInfo = ({ username }) => (
  <div className="hero-header">
    Home
    <h2 className="hero-header-h2">Welcome: {username}</h2>
    <p className="hero-header-p">
      A banking system is a comprehensive digital platform designed to manage
      and streamline the financial operations and services provided by a bank or
      financial institution. It enables the secure handling of essential banking
      functions such as customer onboarding, account creation, deposit and
      withdrawal management, loan processing, transaction tracking, and interest
      calculations. Modern banking systems aim to enhance customer experience
      through automation, real-time data processing, and seamless access to
      services. With robust authentication mechanisms and data integrity checks,
      they ensure the security and privacy of sensitive financial information.
      Additionally, these systems often integrate with APIs, reporting tools,
      and regulatory frameworks to maintain compliance and transparency.
    </p>
  </div>
);

const Home = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("home");

  const renderFeature = () => {
    switch (activeFeature) {
      case "books":
        return <Books username={username} />;
      case "members":
        return <Members username={username} />;
      case "borrowRecords":
        return <BorrowRecords username={username} />;
      default:
        return <p>Please select a feature.</p>;
    }
  };

  return (
    <div className="app-container">
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
        <div className="nav-profile-logo"></div>
      </header>
      <main className="main-content"> {renderFeature()} </main>
    </div>
  );
};

export default Home;
