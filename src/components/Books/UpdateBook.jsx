import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBook = () => {
  const [bookRecords, setBookRecords] = useState([]);
  const [editBook, setEditBook] = useState(null); // Book currently being edited

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        setBookRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBook({ ...editBook, [name]: value });
  };

  const handleEdit = (book) => {
    setEditBook(book);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/books", editBook);
      alert("Book updated successfully!");
      console.log(res.data);
      setEditBook(null); 
    } catch (err) {
      console.error("Error updating book", err);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      {bookRecords.map((bookRecord) => (
        <div key={bookRecord.id}>
          <p>
            <strong>{bookRecord.title}</strong> by {bookRecord.author} (ISBN: {bookRecord.isbn})
          </p>
          <button onClick={() => handleEdit(bookRecord)}>Edit</button>
        </div>
      ))}

      {editBook && (
        <form onSubmit={handleSubmit}>
          <h3>Edit Book</h3>
          <input
            name="title"
            value={editBook.title}
            onChange={handleChange}
            type="text"
            placeholder="Title"
          />
          <input
            name="author"
            value={editBook.author}
            onChange={handleChange}
            type="text"
            placeholder="Author"
          />
          <input
            name="isbn"
            value={editBook.isbn}
            onChange={handleChange}
            type="text"
            placeholder="ISBN"
          />
          <button type="submit">Update Book</button>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
