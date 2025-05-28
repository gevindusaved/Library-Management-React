import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReturnBorrowRecord = () => {
  const [bookRecords, setBookRecords] = useState([]);
  const [editBook, setEditBook] = useState(null); // Book currently being edited
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brecords")
      .then((response) => {
        setBookRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8080/api/brecords",
        editBook
      );
      window.location.reload();

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
        <form onSubmit={handleSubmit}>
          <div key={bookRecord.id}>
            <p>
              <strong>Member Id: {bookRecord.memberId}</strong> Book Id:{" "}
              {bookRecord.bookId} (Borrow Date: {bookRecord.borrowDate}, Return
              Date:{" "}
              {bookRecord.returnDate ? bookRecord.returnDate : "Not Returned"})
            </p>
            <button onClick={() => setEditBook(bookRecord)}>Return</button>
          </div>
        </form>
      ))}
    </div>
  );
};

export default ReturnBorrowRecord;
