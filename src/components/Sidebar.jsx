// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaStar, FaSignOutAlt, FaList } from "react-icons/fa";
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

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li>
          <Link to="/" className="nav-link text-dark" onClick={onClose}>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/book-list" className="nav-link text-dark" onClick={onClose}>
            <FaList /> Book
          </Link>
        </li>
      
      </ul>
    </div>
  );
}

