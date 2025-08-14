import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import AddReview from "./AddReview";
import { Link, useParams } from "react-router-dom";
import { getBookDetailsApi, getReviewApi } from "../services/allApi";
import { reviewStatusContext, tokenContext } from "../context/CreateContext";

function BookDetail() {
  const { reviewAddStatus } = useContext(reviewStatusContext);
const {token}= useContext(tokenContext)
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState({});
  const [review, setReview] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  // Get book details
  const bookdetails = async () => {
    const result = await getBookDetailsApi(id);
    if (result.status === 200) {
      setBook(result.data);
    }
  };

  // Get reviews
  const getReview = async () => {
    if (!book?._id) return;
    const result = await getReviewApi(book._id);
    if (result.status === 200) {
      setReview(result.data);
    }
  };

  useEffect(() => {
    bookdetails();
  }, [id]);

  useEffect(() => {
    getReview();
  }, [book?._id, reviewAddStatus]);

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

          {/* Book Card */}
          <Card className="shadow">
            <Row className="g-0">
              <Col md={4} sm={12}>
                <img
                  src={book.image}
                  className="img-fluid w-100 p-md-5 object-fit-cover rounded-start"
                  alt={book.title}
                  style={{ minHeight: "300px" }}
                />
              </Col>
              <Col md={8} sm={12} className="position-relative">
                <Card.Body
                  className=" rounded w-100 h-100  des d-flex flex-column justify-content-center "
                  style={{  }}
                >
                  <Card.Title className="fw-bold my-3">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    by {book.author}
                  </Card.Subtitle>
                  <p>{book.description}</p>
                  <p>⭐ {book.rating} / 5</p>
                  {token && <button  className="me-auto py-2 px-3 bt" onClick={() => setShowModal(true)}>
                    Add Review
                  </button>}

                </Card.Body>
                
                 <Link to={'/book-list'}>
                    <button  className="position-absolute rounded-pill  ms-auto py-2 px-3 " style={{top:'15px',right:"10px"}} onClick={() => setShowModal(true)}>
                      Back
                    </button>
                 </Link>
              </Col>
            </Row>
          </Card>

          {/* Reviews */}
          <h4 className="mt-4">Reviews</h4>
          {review?.length > 0 ? (
            review.map((r) => (
              <Card key={r._id} className="mb-2">
                <Card.Body>
                  <strong>{r.userId?.name}</strong> - ⭐ {r.rating}
                  <p className="mb-0">{r.comment}</p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          {/* Review Modal */}
          <AddReview
            show={showModal}
            handleClose={() => setShowModal(false)}
            bookId={book?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
