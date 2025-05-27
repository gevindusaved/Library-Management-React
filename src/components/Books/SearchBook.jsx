// SearchBook.jsx
import React from "react";
import "./css/Books.css";

const SearchBook = ({ books, images }) => {
  return (
    <div className="card-grid">
      {books.map((book, bookId) => (
        <div className="card-container" key={book.id}>
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

export default SearchBook;
