import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const books = [
    {
      title: "It Ends with Us",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1688011813i/27362503.jpg",
    },
    {
      title: "Ikigai",
      image:
        "https://m.media-amazon.com/images/I/71cRwWclCvL._UF1000,1000_QL80_.jpg",
    },
    {
      title: "Yellowface",
      image:
        "https://m.media-amazon.com/images/I/61GKZcxOP7L._UF1000,1000_QL80_.jpg",
    },
    {
      title: "Funny story",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691777485i/194802722.jpg",
    },
    {
      title: "Think Like a Monk",
      image: "https://m.media-amazon.com/images/I/81GlTN6QQrL.jpg",
    },
    {
      title: "Ichogo Ichie",
      image:
        "https://assets.isu.pub/document-structure/250117150747-3ad6b4c6b22ebc1dce3548670e1b50d9/v1/778467e65ed81d241f08eeb63d9122fc.jpeg",
    },
  ];

  return (
    <div>
      
        <Header />
      
      {/* Quotes Section */}
      <section className="text-center py-2 qoute">
        <blockquote className="fst-italic fs-5">
          "A room without books is like a body without a soul."
        </blockquote>
      </section>

      {/* Banner */}
      <section>
        <img
          src="https://www.shutterstock.com/image-photo/various-old-books-on-shelf-260nw-557138818.jpg"
          alt="banner"
          className="w-100"
          style={{ height: "300px", objectFit: "cover" }}
        />
      </section>

      {/* Popular Books */}
      <section className="my-5 mx-5">
        <h4 className="mb-3 fw-bold text-center">Popular Books</h4>
        <div className="row g-3 flex-nowrap overflow-auto">
          {books.map((book, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 shadow-md border rounded-4 overflow-hidden book-card">
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold">{book.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <Container className="py-5">
        <h3 className="mb-4 text-center fw-bold">How It Works</h3>
        <Row>
          {[
            { title: "Browse Books", desc: "Explore thousands of reviews." },
            { title: "Add Book", desc: "Add books to share review." },
            { title: "Add Reviews", desc: "Share your thoughts on books." },
          ].map((step, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 text-center shadow-lg border-0 rounded-4 how-card">
                <Card.Body>
                  <Card.Title className="fw-bold fs-5">{step.title}</Card.Title>
                  <Card.Text className="text-muted">{step.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

     <Footer/>
    </div>
  );
}

export default Home;
