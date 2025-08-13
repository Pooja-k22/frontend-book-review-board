import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaBook, FaTimes } from "react-icons/fa";
import { PostBookApi } from "../services/allApi";
import {bookStatusContext, tokenContext} from "../context/CreateContext"

function AddBook({ show, handleClose }) {
  const {token}= useContext(tokenContext)
  const {setbookAddStatus}= useContext(bookStatusContext)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });

  const addBook = async (e) => {
    e.preventDefault();
    const { title, author, description, image } = formData;
    if (!title | !author | !description | !image) {
      alert("please fill all field");
    } else {

      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
     
      
      const result = await PostBookApi(formData,reqHeader);
      console.log(result.data);
      if (result.status == 200) {
        handleClose();
        alert("book add successfully");
        setFormData({
          title: "",
          author: "",
          description: "",
          image: "",
        });
        setbookAddStatus(result.data)
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="bg-primary text-white">
        <Modal.Title>
          <FaBook className="me-2" /> Add New Book
        </Modal.Title>
        <Button
          variant="outline-light"
          size="sm"
          onClick={handleClose}
          style={{ border: "none" }}
        >
          <FaTimes />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addBook}>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              name="author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter book description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Paste book cover image URL"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Book
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBook;
