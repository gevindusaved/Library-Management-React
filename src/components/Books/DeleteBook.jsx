import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteBook = () => {
  const [bookRecords, setBookRecords] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        setBookRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      alert("Book deleted successfully!");
      // Remove the deleted book from the list
      setBookRecords(bookRecords.filter(book => book.bookId !== bookId));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      {bookRecords.map((bookRecord) => (
        <div key={bookRecord.bookId}>
          <p>
            <strong>{bookRecord.title}</strong> by {bookRecord.author} (ISBN: {bookRecord.isbn})
          </p>
          <button onClick={() => handleDelete(bookRecord.bookId)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteBook;
