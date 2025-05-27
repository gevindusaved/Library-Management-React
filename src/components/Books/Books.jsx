import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./css/Books.css";
import HeroHeader from "../Home/HeroHeader";
import AddBook from "./AddBook";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";
import ViewBook from "./ViewBook";

const Books = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("viewbook");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [Feature, setFeature] = useState([false]);

  const handleSearch = () => {
    if (!query.trim()) return;

    axios
      .get(`http://localhost:8080/api/books/search/${query}`)
      .then((response) => {
        setBooks(response.data);
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
  const renderFeature = () => {
    switch (activeFeature) {
      case "viewbook":
        return <ViewBook username={username} />;
      case "addbook":
        return <AddBook username={username} />;
      case "updatebook":
        return <UpdateBook username={username} />;
      case "deletebook":
        return <DeleteBook username={username} />;
      default:
        return <ViewBook username={username} />;
    }
  };

  return (
    <div className="book-container">
      <header className="book-navbar-container">
        <div className="phantom-div"></div>
        <nav className="book-navbar-panel">
          <div className="book-nav-pannel-container">
            <button
              className="book-nav-links"
              onClick={() => {
                setFeature(true);
                setActiveFeature("viewbook");
              }}
            >
              View Book
            </button>
            <button
              className="book-nav-links"
              onClick={() => {
                setFeature(true);
                setActiveFeature("addbook");
              }}
            >
              Add Book
            </button>
            <button
              className="book-nav-links"
              onClick={() => {
                setFeature(true);
                setActiveFeature("updatebook");
              }}
            >
              Update Book
            </button>
            <button
              className="book-nav-links"
              onClick={() => {
                setFeature(true);
                setActiveFeature("deletebook");
              }}
            >
              Delete Book
            </button>
          </div>
        </nav>

        <div className="search-bar">
          <input
            placeholder="Search by ID, title, or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => {
              setFeature(false);
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
      </header>

      <HeroHeader />

      {books.length > 0 && Feature == false ? (
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
      ) : (
        <main className="book-content">{renderFeature()}</main>
      )}
    </div>
  );
};

export default Books;
