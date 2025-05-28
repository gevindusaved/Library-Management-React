import React, { useState } from "react";
import axios from "axios";

const AddMember = () => {
  const [member, setMember] = useState({
    title: "",
    author: "",
    isbn: "",
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/members", member);
      alert("Member added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error adding member", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" type="text" onChange={handleChange} />
      <input name="email" placeholder="Email" type="text" onChange={handleChange} />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMember;
