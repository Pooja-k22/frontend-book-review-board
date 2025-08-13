// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { FaBell } from 'react-icons/fa';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/books').then(res => setBooks(res.data));
  }, []);

  return (
    <div className="ms-5 ps-5" style={{marginLeft: '270px', padding: '20px'}}>
      {/* Hero Section */}
      <div className="bg-dark text-white p-4 rounded d-flex justify-content-between align-items-center">
        <div>
          <h2>Find your next book to review</h2>
          <input
            type="text"
            placeholder="Search for a book"
            className="form-control mt-2"
            style={{width: '300px'}}
          />
        </div>
        <FaBell size={24} />
      </div>

      {/* Popular Books */}
      <h4 className="mt-4">Popular</h4>
      <div className="d-flex overflow-auto gap-3 pb-3">
        {books.map(book => (
          <div key={book._id} className="card" style={{minWidth: '150px'}}>
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="card-img-top"
              style={{height: '200px', objectFit: 'cover'}}
            />
            <div className="card-body p-2">
              <h6 className="card-title mb-1">{book.title}</h6>
              <small className="text-muted">by {book.author}</small>
              <div className="text-warning small">{"★".repeat(4)}☆</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <h4 className="mt-4">We Recommend</h4>
      <div className="d-flex overflow-auto gap-3 pb-3">
        {books.map(book => (
          <div key={book._id} className="card" style={{minWidth: '150px'}}>
            <img
              src={book.coverImageUrl}
              alt={book.title}
              className="card-img-top"
              style={{height: '200px', objectFit: 'cover'}}
            />
            <div className="card-body p-2">
              <h6 className="card-title mb-1">{book.title}</h6>
              <small className="text-muted">by {book.author}</small>
              <div className="text-warning small">{"★".repeat(5)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
