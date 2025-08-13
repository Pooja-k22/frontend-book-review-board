import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import AddReview from "./AddReview";
import { useParams } from "react-router-dom";
import { getBookDetailsApi, getReviewApi } from "../services/allApi";
import { reviewStatusContext } from "../context/CreateContext";

function BookDetail() {
  const { reviewAddStatus } = useContext(reviewStatusContext);

  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState({});
  const [review, setReview] = useState([]);

  // get book details
  const bookdetails = async () => {
    const result = await getBookDetailsApi(id);
    //console.log(result.data);
    if (result.status == 200) {
      setBook(result.data);
    }
  };

  // getreviews
  const getReview = async () => {
    const bookId = book?._id;
    const result = await getReviewApi(bookId);
    console.log(result.data);
    if (result.status == 200) {
      setReview(result.data);
    }
  };

  useEffect(() => {
    bookdetails();
    if (book?._id) {
      getReview();
    }
  }, [reviewAddStatus, id, book?._id]);

  return (
    <div className="container-fluid  ">
      <div className="row vh-100">
        {/* Sidebar */}
        <div
          className="col-lg-2 col-md-4  p-0"
          style={{
            backgroundColor: "rgb(166, 142, 107)",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <Sidebar />
        </div>
        <div className="container col-lg-10 col-md-4 ">
          <Card className="shadow ">
            <div className="row g-4">
              <div className="col-md-4" style={{ width: "300px", height: "400px" }}>
                <img
                  src={book.image}
                  className="img-fluid w-100 rounded-start"
                  alt={book.title}
                />
              </div>
              <div className="p-5 col-md-8">
                <Card.Body
                  className="rounded w-100 h-100 p-5 "
                  style={{ backgroundColor: "rgb(247, 254, 229)" }}
                >
                  <Card.Title className="fw-bold">{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    by {book.author}
                  </Card.Subtitle>
                  <p>{book.description}</p>
                  <p>⭐ {book.rating} / 5</p>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Review
                  </Button>
                </Card.Body>
              </div>
            </div>
          </Card>

          <h4 className="mt-4">Reviews</h4>
          {review?.length > 0 ? (
           review?.map((r) => (
              <Card key={r.id} className="mb-2">
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
