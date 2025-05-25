import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import "./css/Books.css";

const ViewBook = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Load all books when the component mounts
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("/api/books"); // fetch all books
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };

    fetchAllBooks();
  }, []); // Empty dependency array = run only once on mount

  // Optional search handler if you still want to keep the search functionality
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/books/search/${query}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <header className="header-content"></header>
      <input
        placeholder="Search by ID, title, or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    add_book_date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Adding Book:", JSON.stringify(book, null, 2));

    if (!book.title || Number(book.isbn) < 0) {
      alert("Please enter valid book details.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/books`, book, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Book Added - done successfully!");
      navigate(`/home`);
    } catch (error) {
      console.error(
        "Error adding transaction:",
        error.response?.data || error.message
      );
      alert("Failed to add book. Please check the console for more details.");
    }
  };

  return (
    <div className="content-acc-container">
      <h2 className="add-book-h2">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-book">
          <div className="add-book-content">
            <label htmlFor="author">Author of Book:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-book-content">
            <label htmlFor="title">Title of Book:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-book-content">
            <label htmlFor="isbn">isbn of Book:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-book">
          Add Book
        </button>
      </form>
    </div>
  );
};

const UpdateBook = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/books/search/${query}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books.");
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setUpdatedFields(book);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedBook) return;
    console.log("Updating book ID:", selectedBook);
    try {
      await axios.put(`/api/books/${selectedBook.bookId}`, updatedFields, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Updating book ID:", selectedBook);
      alert("Book updated successfully!");
      setSelectedBook(null);
      setQuery("");
      setResults([]);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update the book.");
    }
  };

  return (
    <div className="update-book-container">
      <header className="header-content"></header>

      {!selectedBook ? (
        <>
          <input
            placeholder="Search by ID, title, or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <ul>
            {results.map((book) => (
              <li key={book.id}>
                {book.title} — {book.author}{" "}
                <button onClick={() => handleSelectBook(book)}>Edit</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>Update Book: {selectedBook.title}</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="add-book-content">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={updatedFields.title}
                onChange={handleChange}
              />
            </div>

            <div className="add-book-content">
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={updatedFields.author}
                onChange={handleChange}
              />
            </div>

            <div className="add-book-content">
              <label>ISBN:</label>
              <input
                type="text"
                name="isbn"
                value={updatedFields.isbn}
                onChange={handleChange}
              />
            </div>

            <button onClick={handleUpdate} className="submit-book">
              Update Book
            </button>

            <button
              onClick={() => setSelectedBook(null)}
              className="cancel-btn"
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
};

const DeleteBook = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  

  // Search books by ID, title, or author
  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/books/search/${query}`);
      setResults(res.data);
    } catch (error) {
      console.error("Error searching books:", error);
      alert("Failed to search books.");
    }
  };
  
  // Delete a specific book by ID
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    console.log("Updating book ID:", query);
    try {
      await axios.delete(`/api/books/${query}`);
      alert("Book deleted successfully!");
      // Refresh list after deletion
      setResults(results.filter((book) => book.id !== query));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book.");
    }
  };

  return (
    <div>
      <header className="header-content"></header>
      <input
        placeholder="Search by ID, title, or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author}{" "}
            <button
              onClick={() => handleDelete(book.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Books = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("books");

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
        return <p>Please select a feature.</p>;
    }
  };

  return (
    <div className="book-container">
      <header className="nook-navbar-container">
        <nav className="navbar-panel">
          <div className="nav-pannel-container">
            <button
              className="nav-links"
              onClick={() => setActiveFeature("viewbook")}
            >
              View Books
            </button>
            <button
              className="nav-links"
              onClick={() => setActiveFeature("addbook")}
            >
              Add Book
            </button>
            <button
              className="nav-links"
              onClick={() => setActiveFeature("updatebook")}
            >
              Update Book
            </button>
            <button
              className="nav-links"
              onClick={() => setActiveFeature("deletebook")}
            >
              Delete Book
            </button>
          </div>
        </nav>
      </header>
      <main className="main-content"> {renderFeature()} </main>
    </div>
  );
};
export default Books;
