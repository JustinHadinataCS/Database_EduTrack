import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  //   useEffect(() => {
  //     async function fetchAllBooks() {
  //       try {
  //         const res = await axios.get("http://localhost:8800/books");
  //         setBooks(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchAllBooks();
  //   });
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Lama Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
}

export default Books;
