import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { tokenContext } from "../context/CreateContext";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  const { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("existingUser");
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  
  };


  return (
    <>
      {/* Header */}
      <Navbar bg="" variant="" expand="lg" className="px-5 head  sticky-top ">
        <Navbar.Brand className="text-light fw-bold fs-2">
          BookVerse
        </Navbar.Brand>
        <Nav className="ms-auto  text-white d-none d-md-flex">
          <Link to="/" className="text-light text-decoration-none me-4">
            Home
          </Link>
          <Link
            to="/book-list"
            className="text-decoration-none text-light me-4"
          >
            {" "}
            Book
          </Link>
          {!token ? (
            <Link to={"/login"} className="text-light text-decoration-none">
              Login
            </Link>
          ) : (
            <Link onClick={logout} className="text-light text-decoration-none">
              Logout
            </Link>
          )}
        </Nav>
        <Nav-End className=" d-md-none">
          <FaBars className="text-light" onClick={() => setShowSidebar(!showSidebar)} />
        </Nav-End>
      </Navbar>
      {showSidebar && (
        <div className="d-flex flex-column d-md-none ps-5 pb-4 head gap-2">
          <Link to={'/'} className="text-light text-decoration-none">🔸Home</Link>
          <Link to="/book-list" className="text-light text-decoration-none">🔸Book</Link>
          {!token ? (
            <Link to={"/login"} className="text-light text-decoration-none">
              🔸Login
            </Link>
          ) : (
            <Link onClick={logout} className="text-light text-decoration-none">
              🔸Logout
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
