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
      <Modal.Header className=" d-flex justify-content-between align-content-center text-white" style={{backgroundColor:"rgb(45, 26, 4)"}}>
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
          <div className="my-3">
            
            <input
              type="text"
              placeholder="Enter book title"
              className="form-control "
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
          
            <input
              type="text"
              placeholder="Enter author name"
              name="author"
               className="form-control "
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
           
            <textarea
              as="textarea"
              rows={3}
              placeholder="Enter book description"
              name="description"
               className="form-control "
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
           
            <input
              type="url"
              placeholder="Paste book cover image URL"
              name="image"
               className="form-control "
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          <div className="text-end mt-5">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <button  className=" py-2 px-3 bt" type="submit">
              Add Book
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBook;
