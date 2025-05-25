import { useState } from "react";
import axios from "../../api/axiosConfig";
import "./css/BorrowRecords.css";

const BorrowRecords = () => {
  const [idQuery, setIdQuery] = useState("");         // For ID search
  const [textQuery, setTextQuery] = useState("");     // For title/author
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      let finalResults = [];

      if (idQuery.trim()) {
        const res = await axios.get(`/api/brecords/search/${idQuery}`);
        finalResults = res.data;
      }

      if (textQuery.trim()) {
        const res2 = await axios.get(`/api/books/search/${textQuery}`);
        // Assuming the backend returns borrow records here too; adjust if needed.
        finalResults = [...finalResults, ...res2.data];
      }

      // Remove duplicates if needed (e.g., by bookId + memberId combo)
      const seen = new Set();
      const unique = finalResults.filter((r) => {
        const key = `${r.bookId}-${r.memberId}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setResults(unique);
      setError("");
    } catch (error) {
      console.error("Error fetching borrow records:", error);
      setError("Could not fetch records. Please try again.");
    }
  };

  return (
    <div>
      <p>Book Id</p>
      <input
        placeholder="Search by Member ID or Book ID"
        value={idQuery}
        onChange={(e) => setIdQuery(e.target.value)}
      />
      <p>Member Id</p>
      <input
        placeholder="Search by Title or Author"
        value={textQuery}
        onChange={(e) => setTextQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      <ul>
        {results.map((record, index) => (
          <li key={`${record.bookId}-${record.memberId}-${index}`}>
            Member ID: {record.memberId}, Book ID: {record.bookId}, Borrow Date: {record.borrowDate}, Return Date:{" "}
            {record.returnDate ? record.returnDate : "Not returned"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowRecords;
