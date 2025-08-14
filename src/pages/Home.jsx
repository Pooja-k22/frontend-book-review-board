import { useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
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
    {title:"Ichogo Ichie",
      image:"https://assets.isu.pub/document-structure/250117150747-3ad6b4c6b22ebc1dce3548670e1b50d9/v1/778467e65ed81d241f08eeb63d9122fc.jpeg"
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - visible on md+ screens */}
        <div
          className="col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            backgroundColor: "rgb(143, 105, 0)",
            minHeight: "100vh",
          }}
        >
          <Sidebar />
        </div>

        {/* Sidebar Overlay for mobile */}
        {showSidebar && (
          <div
            className="position-fixed top-0 start-0 w-75 h-100 d-md-none"
            style={{
              backgroundColor: "rgb(143, 105, 0)",
              zIndex: 1050,
            }}
          >
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="col-md-9 col-lg-10">
          {/* Mobile Menu Button */}
          <button
            className="btn btn-outline-dark d-md-none my-3"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>

          {/* Hero Section */}
          <div
            className="text-white p-4 rounded d-flex flex-wrap justify-content-between align-items-center mb-4"
            style={{
              backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/030/503/504/small_2x/lots-of-books-on-the-table-in-front-of-the-library-shelves-generative-ai-photo.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
            }}
          >
            <div>
              <h2 className="fw-bold">Find Your Next Book to Review</h2>
              <input
                type="text"
                placeholder="Search for a book"
                className="form-control mt-2"
                style={{ maxWidth: "300px" }}
              />
            </div>
            <div className="mt-3 mt-md-0">
              <FaBell size={24} />
            </div>
          </div>

          {/* Popular Books */}
          <section>
            <h4 className="mb-3">Popular</h4>
            <div className="row g-3  ">
            
                {books.map((book) => (
                    <div className="col-12 col-sm-4 col-md-3 col-lg-2">
                  <div className="card h-100 shadow">
                    <img
                      src={book.image}
                      alt="book.title"
                      className="card-img-top rounded-b-5"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title my-2 fw-bold ">
                        {book.title}
                      </h6>
                    </div>
                  </div>
                   </div>
                ))}
             
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
