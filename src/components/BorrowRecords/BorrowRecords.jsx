import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./css/BorrowRecords.css";
import HeroHeader from "../Home/HeroHeader";
import AddBorrowRecord from "./AddBorrowRecord";
import ReturnBorrowRecord from "./ReturnBorrowRecord";

const BorrowRecords = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("addborrowrecord");
  const [query, setQuery] = useState("");
  const [brecords, setBRecords] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    axios
      .get(`http://localhost:8080/api/brecords/member/${query}`)
      .then((response) => {
        setBRecords(response.data);
        setIsSearchMode(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const images = [
    "/assets/0032079a-ebf7-4fde-aee8-2ad4109abe56.jpeg",
    "/assets/433663a2-d1df-4ee3-82db-0aa4f7ccfd5a.jpeg",
    "/assets/Bold Minimalism Graphic Design Trends 2023 Poster Design by Zeka Design.jpeg",
    "/assets/cc1089ba-ba69-4d02-8d03-60c0f3047e48.jpeg",
    "/assets/_ (8).jpg",
  ];

  const renderFeature = () => {
    switch (activeFeature) {
      case "addborrowrecord":
        return <AddBorrowRecord username={username} />;
      case "returnborrowrecord":
        return <ReturnBorrowRecord username={username} />;
      default:
        return <AddBorrowRecord username={username} />;
    }
  };

  return (
    <div className="brecord-container">
      <header className="brecord-navbar-container">
        <div className="phantom-div"></div>
        <nav className="brecord-navbar-panel">
          <div className="brecord-nav-pannel-container">
            <button
              className="brecord-nav-links"
              onClick={() => {
                setIsSearchMode(false);
                setActiveFeature("addborrowrecord");
              }}
            >
              Add Borrow Records
            </button>
            <button
              className="brecord-nav-links"
              onClick={() => {
                setIsSearchMode(false);
                setActiveFeature("returnborrowrecord");
              }}
            >
              Return Borrow Records
            </button>
          </div>
        </nav>

        <div className="search-bar">
          <input
            placeholder="Search by ID, title, or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <HeroHeader />

      {brecords.length > 0 && isSearchMode ? (
        <div className="card-grid">
          {brecords.map((brecord, index) => (
            <div className="card-container" key={brecord.id || index}>
              <div className="img-card-container">
                <img
                  className="img-img"
                  src={images[index % images.length]}
                  alt={brecord.title}
                />
              </div>
              <div className="text-card-container">
                {/* <h3 className="topic-card">Member Id- {brecord.memberId} Book Id- {brecord.bookId} </h3> */}
                <p className="para-card">Member Id- {brecord.memberId} Book Id- {brecord.bookId}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <main className="brecord-content">{renderFeature()}</main>
      )}
    </div>
  );
};

export default BorrowRecords;
