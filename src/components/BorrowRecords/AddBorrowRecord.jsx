import React, { useState } from "react";
import axios from "axios";

const AddBorrowRecord = () => {
  const [brecords, setBRecords] = useState({
    BookId: "",
    memberId: "",
  });

  const handleChange = (e) => {
    setBRecords({ ...brecords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/brecords", brecords);
      alert("setBRecords added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error adding brecords", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="memberId" placeholder="MemberId" type="text" onChange={handleChange} />
      <input name="bookId" placeholder="BookId" type="text" onChange={handleChange} />
      <button type="submit">Add Borrow Record</button>
    </form>
  );
};

export default AddBorrowRecord;
