import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../services/allApi";

function Register() {
  const navigate = useNavigate();
  const [userD, setuserD] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); 

  // validation function
  const validate = () => {
    const newErrors = {};

    if (!userD.name.trim()) newErrors.name = "Name is required";

    if (!userD.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userD.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userD.password) {
      newErrors.password = "Password is required";
    } else if (userD.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validate()) return; 

    try {
      const result = await registerApi(userD);

      if (result.status === 200) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "none",
        }}
      >
        <h3 className="text-center text-white mb-4">Register</h3>
        <Form onSubmit={register}>
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaUser className="me-2 text-muted" />
              <Form.Control
                type="text"
                placeholder="Full Name"
                className="border-0 shadow-none"
                value={userD.name}
                onChange={(e) =>
                  setuserD({ ...userD, name: e.target.value })
                }
              />
            </div>
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaEnvelope className="me-2 text-muted" />
              <Form.Control
                type="email"
                placeholder="Email"
                className="border-0 shadow-none"
                value={userD.email}
                onChange={(e) =>
                  setuserD({ ...userD, email: e.target.value })
                }
              />
            </div>
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaLock className="me-2 text-muted" />
              <Form.Control
                type="password"
                placeholder="Password"
                className="border-0 shadow-none"
                value={userD.password}
                onChange={(e) =>
                  setuserD({ ...userD, password: e.target.value })
                }
              />
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 fw-bold">
            Register
          </Button>
        </Form>

        <p className="text-center text-white mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="fw-bold"
            style={{ color: "rgb(254, 203, 36)" }}
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
