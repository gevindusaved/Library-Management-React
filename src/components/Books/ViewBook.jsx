import "./css/ViewBook.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        setBooks(response.data);
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
      {books.map((book, bookId) => (
        <div className="card-container" key={bookId}>
          <div className="img-card-container">
            <img
              className="img-img"
              src={images[bookId % images.length]}
              alt={book.title}
            />
          </div>
          <div className="text-card-container">
            <h3 className="topic-card">{book.title}</h3>
            <p className="para-card">{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewBook;
