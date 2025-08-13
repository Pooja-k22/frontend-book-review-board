import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch your books from API
    // setBooks(fetchedBooks);
  }, []);

  return (
    <div className="container-fluid ">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-4 vh-md-100 p-0" style={{backgroundColor:"rgb(166, 142, 107)",borderTopRightRadius: '15px', borderBottomRightRadius: '15px'}}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-10 col-md-8 p-4">
          {/* Hero Section */}
       <div
  className="text-white p-4 rounded d-flex flex-wrap justify-content-between align-items-center mb-4"
  style={{
    backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/030/503/504/small_2x/lots-of-books-on-the-table-in-front-of-the-library-shelves-generative-ai-photo.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height:"300px"
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
            <div className="row g-3 flex-nowrap overflow-auto">
              {/* {books.map((book) => ( */}
                <div key="" className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="card h-100">
                    <img
                      src=""
                      alt="book.title"
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title mb-1 text-truncate">book.title</h6>
                      <small className="text-muted">by book.author</small>
                      <div className="text-warning small">
                        "★".repeat(4)☆
                      </div>
                    </div>
                  </div>
                </div>
              {/* ))} */}
            </div>
          </section>

          {/* Recommendations */}
          {/* <section className="mt-5">
            <h4 className="mb-3">We Recommend</h4>
            <div className="row g-3 flex-nowrap overflow-auto">
             
                <div key="" className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="card h-100">
                    <img
                      src=""
                      alt="book.title"
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title mb-1 text-truncate">title</h6>
                      <small className="text-muted">by book.author</small>
                      <div className="text-warning small">
                        "★".repeat
                      </div>
                    </div>
                  </div>
                </div>
              
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
}
