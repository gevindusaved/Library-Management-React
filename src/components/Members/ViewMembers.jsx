import "./css/ViewMember.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMember = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/members")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const images = [
    "/assets/0032079a-ebf7-4fde-aee8-2ad4109abe56.jpeg",
    "/assets/433663a2-d1df-4ee3-82db-0aa4f7ccfd5a.jpeg",
    "/assets/Bold Minimalism Graphic Design Trends 2023 Poster Design by Zeka Design.jpeg",
    "/assets/cc1089ba-ba69-4d02-8d03-60c0f3047e48.jpeg",
    "/assets/_ (8).jpg",
    "/assets/0032079a-ebf7-4fde-aee8-2ad4109abe56.jpeg",
    "/assets/433663a2-d1df-4ee3-82db-0aa4f7ccfd5a.jpeg",
    "/assets/Bold Minimalism Graphic Design Trends 2023 Poster Design by Zeka Design.jpeg",
    "/assets/cc1089ba-ba69-4d02-8d03-60c0f3047e48.jpeg",
    "/assets/_ (8).jpg",
    "/assets/0032079a-ebf7-4fde-aee8-2ad4109abe56.jpeg",
    "/assets/433663a2-d1df-4ee3-82db-0aa4f7ccfd5a.jpeg",
    "/assets/Bold Minimalism Graphic Design Trends 2023 Poster Design by Zeka Design.jpeg",
    "/assets/cc1089ba-ba69-4d02-8d03-60c0f3047e48.jpeg",
  ];

  const [, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="card-grid">
      {members.map((member, memberId) => (
        <div className="card-container" key={memberId}>
          <div className="img-card-container">
            <img
              className="img-img"
              src={images[memberId % images.length]}
              alt={member.title}
            />
          </div>
          <div className="text-card-container">
            <h3 className="topic-card">{member.name}</h3>
            <p className="para-card">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewMember;
