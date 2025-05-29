import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./css/Members.css";
import AddMember from "./AddMember";
import ViewMember from "./ViewMembers";
import HeroHeader from "../Home/HeroHeader";

const Members = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("viewmember");
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    axios
      .get(`http://localhost:8080/api/members/id/${query}`)
      .then((response) => {
        setMembers([response.data]); // assuming one result
        setIsSearchActive(true);
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
      case "viewmember":
        return <ViewMember username={username} />;
      case "addmember":
        return <AddMember username={username} />;
      default:
        return <ViewMember username={username} />;
    }
  };

  return (
    <div className="member-container">
      <header className="member-navbar-container">
        <div className="phantom-div"></div>

        <nav className="member-navbar-panel">
          <div className="member-nav-pannel-container">
            <button
              className="member-nav-links"
              onClick={() => {
                setIsSearchActive(false);
                setActiveFeature("viewmember");
              }}
            >
              View Member
            </button>
            <button
              className="member-nav-links"
              onClick={() => {
                setIsSearchActive(false);
                setActiveFeature("addmember");
              }}
            >
              Add Member
            </button>
          </div>
        </nav>

        <div className="member-search-bar">
          <input
            placeholder="Search by ID, title, or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <HeroHeader />
      {members.length > 0 && isSearchActive ? (
        <div className="card-grid">
          {members.map((member, index) => (
            <div className="card-container" key={member.id || index}>
              <div className="img-card-container">
                <img
                  className="img-img"
                  src={images[index % images.length]}
                  alt={member.name}
                />
              </div>
              <div className="text-card-container">
                <h3 className="topic-card">{member.name}</h3>
                <p className="para-card">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <main className="member-content">{renderFeature()}</main>
      )}
    </div>
  );
};

export default Members;
