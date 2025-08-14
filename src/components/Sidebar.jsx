// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaHome, FaList } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../context/CreateContext";

export default function Sidebar({ onClose }) {
  const { token, setToken } = useContext(tokenContext);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("existingUser");
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    if (onClose) onClose();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("existingUser"));
    if (user) setUserName(user.name);
  }, [token]);

  return (
    <div
      className="d-flex flex-column min-vh-100 p-4 bar"
      
    >
      {/* Close button on mobile */}
      <button
        className="btn btn-sm btn-light align-self-end d-md-none"
        onClick={onClose}
      >
        ✖
      </button>

      <div className="text-center mb-4">
        <h4 className="text-white fw-bold  mb-5"> <FaBook className="me-2" /> BOOKVERSE</h4>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-9.png"
          alt="profile"
          className="rounded-circle mb-2"
          width="80"
          height="80"
        />
        <h6>{userName}</h6>

        {!token ? (
          <Link to="/login" className="btn btn-sm btn-dark mt-2" onClick={onClose}>
            Login
          </Link>
        ) : (
          <button onClick={logout} className="btn btn-sm btn-dark mt-2">
            Logout
          </button>
        )}
      </div>

      <div className=" mb-3 ">
        <div className="mb-2">
          <Link to="/" className="text-decoration-none  text-light " onClick={onClose}>
            <FaHome className="me-2"/> Home
          </Link>
        </div>
        <div>
          <Link to="/book-list" className="text-decoration-none  text-light" onClick={onClose}>
            <FaList className="me-2" /> Book
          </Link>
        </div>
      
      </div>
    </div>
  );
}

