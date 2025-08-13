import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import AddBook from "./AddBook";
import { Link } from "react-router-dom";
import { getbookApi } from "../services/allApi";
import { bookStatusContext } from "../context/CreateContext";



function BookList() {
      const {bookAddStatus}= useContext(bookStatusContext)
    
  const [showModal, setShowModal] = useState(false);
  const [books,setBooks] = useState([])

//  get books
const getBook = async()=>{
  const result = await getbookApi()
  console.log(result.data);
  if(result.status == 200){
    setBooks(result.data)
  }
  
}

useEffect(()=>{
  getBook()
},[bookAddStatus])
  return (
   <div className="container-fluid ">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-lg-2 col-md-4 vh-100 "
            style={{
              backgroundColor: "rgb(166, 142, 107)",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            <Sidebar />
          </div>
          <Container className="py-5 col-lg-10 col-sm-12 px-5">
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Book List</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Add New Book
                </Button>
              </div>
    
              {/* AddBookModal Component */}
              <AddBook
                show={showModal}
                handleClose={() => setShowModal(false)}
               
              />
            </div>
    
            <Row>
              {books.map((book) => (
                <Col key={book.id} md={4} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Img
                      variant="top"
                      src={book.img}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text className="text-muted">By {book.author}</Card.Text>
                      <Link to={`/book-detail/${book._id}`}><Button variant="outline-info" className="me-2">
                        View</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
   </div>
  );
}

export default BookList;
