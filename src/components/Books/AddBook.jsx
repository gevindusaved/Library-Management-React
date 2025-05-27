import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/books", book);
      alert("Book added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error adding book", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" type="text" onChange={handleChange} />
      <input name="author" placeholder="Author" type="text" onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" type="text" onChange={handleChange} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
