import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import AddReview from "./AddReview";
import { Link, useParams } from "react-router-dom";
import { getBookDetailsApi, getReviewApi } from "../services/allApi";
import { reviewStatusContext, tokenContext } from "../context/CreateContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookDetail() {
  const { reviewAddStatus } = useContext(reviewStatusContext);
  const { token } = useContext(tokenContext);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState({});
  const [review, setReview] = useState([]);
  const [avgR, setAvgR] = useState("");

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
      const avgReview =
        result.data.reduce((acc, cur) => acc + cur.rating, 0) /
        result.data.length;
      setAvgR(avgReview.toFixed(1));
    }
  };

  useEffect(() => {
    bookdetails();
  }, [id]);

  useEffect(() => {
    getReview();
  }, [book?._id, reviewAddStatus]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row min-vh-100">
          <div className="col-md-2"></div>
          {/* Main Content */}
          <div className="col-md-8 p-3">
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
                    style={{}}
                  >
                    <Card.Title className="fw-bold my-3">
                      {book.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      by {book.author}
                    </Card.Subtitle>
                    <p>{book.description}</p>
                    <p className="bg-warning p-2 rounded-2 me-auto d-flex align-items-center text-light">
                      <FaStar className="text-light me-2" />
                      {avgR ? avgR : "0"}/5
                    </p>
                    {token && (
                      <button
                        className="me-auto py-2 px-3 bt"
                        onClick={() => setShowModal(true)}
                      >
                        Add Review
                      </button>
                    )}
                  </Card.Body>

                  <Link to={"/book-list"}>
                    <button
                      className="position-absolute rounded-pill  ms-auto py-2 px-3 "
                      style={{ top: "15px", right: "10px" }}
                      onClick={() => setShowModal(true)}
                    >
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
                <Card key={r._id} className="mb-2 shadow-lg">
                  <Card.Body>
                    <div className="d-flex justify-content-start align-items-center ">
                      <p className="bg-warning p-2 mb-0 rounded-2 me-4 d-flex align-items-center text-light">
                        <FaStar className="text-light me-2" />
                        {r.rating}{" "}
                      </p>

                      <strong>{r.userId?.name}</strong>
                    </div>
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
          <div className="col-md-2"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;
