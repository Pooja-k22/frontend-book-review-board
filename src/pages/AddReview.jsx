import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { reviewStatusContext, tokenContext } from "../context/CreateContext";
import { addReviewApi } from "../services/allApi";

const AddReview = ({ show, handleClose ,bookId}) => {
  const { token } = useContext(tokenContext);
  const{setreviewAddStatus}= useContext(reviewStatusContext)
  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });

  const onSubmit = async () => {
    const { rating, comment } = review;
    if (!rating || !comment) {
      alert("Please fill all fields");
    } else {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      
      const result = await addReviewApi({rating,bookId,comment}, reqHeader);
      console.log(result);
      if (result.status == 200) {
        setreviewAddStatus(result.data)
        alert("review added successfully");
        setReview({ rating: "", comment: "" });
        
        handleClose();
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <button  className=" py-2 px-3 bt" onClick={onSubmit}>
          Submit Review
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReview;
