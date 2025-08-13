import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaStar, FaSignOutAlt, FaList, FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../context/CreateContext";
import { Offcanvas, Button } from "react-bootstrap";

export default function Sidebar({ user, onLogout }) {
  const { token, setToken } = useContext(tokenContext);
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // Logout handler
  const logout = () => {
    localStorage.removeItem("existingUser");
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("existingUser"));
    if (storedUser) {
      setUserName(storedUser.name);
    }
  }, [token]);

  // Sidebar content (shared between desktop + mobile)
  const SidebarContent = () => (
    <div className="d-flex flex-column h-100 p-4">
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
          <Link to={"/login"} className="btn btn-sm btn-dark mt-2">
            Login
          </Link>
        ) : (
          <Link onClick={logout} className="btn btn-sm btn-dark mt-2">
            Logout
          </Link>
        )}
      </div>

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li>
          <Link to="/" className="nav-link text-dark">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/book-list" className="nav-link text-dark">
            <FaList /> Book
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link text-dark">
            <FaStar /> My Reviews
          </Link>
        </li>
        {user && (
          <li>
            <button
              onClick={onLogout}
              className="btn btn-link text-danger text-start"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-flex flex-column vh-100 p-0  position-fixed"
        style={{ width: "220px" }}
      >
        <SidebarContent />
      </div>

      {/* Mobile Top Bar */}
      <div className="d-flex d-md-none justify-content-between align-items-center p-2 ">
        <Button variant="light" onClick={() => setShow(true)}>
          <FaBars size={20} />
        </Button>
       
      </div>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
