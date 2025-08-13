// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaStar, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100 position-fixed" style={{width: '250px', borderTopRightRadius: '15px', borderBottomRightRadius: '15px'}}>
      <div className="text-center mb-4">
        <img
          src={user?.avatar || "https://via.placeholder.com/80"}
          alt="profile"
          className="rounded-circle mb-2"
          width="80"
          height="80"
        />
        <h6>{user?.name || "Guest"}</h6>
        {user && (
          <button onClick={onLogout} className="btn btn-sm btn-dark mt-2">Log Out</button>
        )}
      </div>

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li><Link to="/" className="nav-link text-dark"><FaHome /> Home</Link></li>
        <li><Link to="/add-book" className="nav-link text-dark"><FaPlus /> Add Book</Link></li>
        <li><Link to="/my-reviews" className="nav-link text-dark"><FaStar /> My Reviews</Link></li>
        <li><Link to="/settings" className="nav-link text-dark"><FaCog /> Settings</Link></li>
        <li><Link to="/profile" className="nav-link text-dark"><FaUser /> Profile</Link></li>
        {user && (
          <li>
            <button onClick={onLogout} className="btn btn-link text-danger text-start">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
