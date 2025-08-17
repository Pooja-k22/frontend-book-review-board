import React, { useContext, useEffect, useState } from "react";
import {  Card, Row, Col, Container } from "react-bootstrap";
import AddBook from "./AddBook";
import { Link } from "react-router-dom";
import { getbookApi } from "../services/allApi";
import { bookStatusContext, tokenContext } from "../context/CreateContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookList() {
  const { token } = useContext(tokenContext);
  const { bookAddStatus } = useContext(bookStatusContext);

  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch books
  const getBook = async () => {
    const result = await getbookApi();
    if (result.status === 200) {
      setBooks(result.data);
    }
  };

  useEffect(() => {
    getBook();
  }, [bookAddStatus]);

  return (
    <div className="">
      <Header />

      {/* Main Content */}
      <div className="py-2 px-2 px-md-5 min-vh-100">
        <Container fluid className="py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Book List</h2>
            {token && (
              <button
                className="bt py-2 px-3"
                onClick={() => setShowModal(true)}
              >
                + Add New Book
              </button>
            )}
          </div>

          {/* AddBook Modal */}
          <AddBook show={showModal} handleClose={() => setShowModal(false)} />

          {/* Book Cards */}
          <Row>
            {books.map((book) => (
              <Col key={book._id} xs={12} sm={6} md={3} className="mb-4">
                <Card className="shadow-sm h-100 ">
                  <Card.Img
                    variant="top"
                    src={book.image}
                    style={{ height: "300px", objectFit: "fill" }}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="text-muted">
                      By {book.author}
                    </Card.Text>
                    <Link to={`/book-detail/${book._id}`}>
                      <button className="me-2 bt py-2 px-3 ">View</button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default BookList;
