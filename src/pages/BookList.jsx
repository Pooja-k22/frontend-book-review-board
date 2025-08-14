import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AddBook from "./AddBook";
import { Link } from "react-router-dom";
import { getbookApi } from "../services/allApi";
import { bookStatusContext, tokenContext } from "../context/CreateContext";
import { FaBars } from "react-icons/fa";

function BookList() {
  const {token}= useContext(tokenContext)
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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - Desktop */}
        <div
          className="col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            backgroundColor: "rgb(143, 105, 0)",
            minHeight: "100vh",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Sidebar />
        </div>

        {/* Sidebar - Mobile Overlay */}
        {showSidebar && (
          <div
            className="position-fixed top-0 start-0 w-75 h-100 d-md-none"
            style={{
              backgroundColor: "rgb(143, 105, 0)",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              zIndex: 1050,
            }}
          >
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-3">
          {/* Mobile Menu Button */}
          <button
            className="btn btn-outline-dark d-md-none mb-3"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>

          <Container fluid className="py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Book List</h2>
              {token && <button className="bt py-2 px-3" onClick={() => setShowModal(true)}>
               + Add New Book
              </button>}
            </div>

            {/* AddBook Modal */}
            <AddBook
              show={showModal}
              handleClose={() => setShowModal(false)}
            />

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
                        <button className="me-2 bt py-2 px-3 " >
                          View
                        </button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default BookList;
