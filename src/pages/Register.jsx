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

  // api call register
  const register = async (e) => {
    e.preventDefault()
    const { name, email, password } = userD;
    if (!name | !email | !password) {
      alert("please fill all field");
    } else {
      const result = await registerApi({ name, email, password });
      console.log(result.data);
      
      if (result.status == 200) {
        alert("register successfull");
        navigate("/login");
      } else {
        alert("something went wrong");
      }
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
                onChange={(e) => {
                  setuserD({ ...userD, name: e.target.value });
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaEnvelope className="me-2 text-muted" />
              <Form.Control
                type="email"
                placeholder="Email"
                className="border-0 shadow-none"
                value={userD.email}
                onChange={(e) => {
                  setuserD({ ...userD, email: e.target.value });
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaLock className="me-2 text-muted" />
              <Form.Control
                type="password"
                placeholder="Password"
                className="border-0 shadow-none"
                value={userD.password}
                onChange={(e) => {
                  setuserD({ ...userD, password: e.target.value });
                }}
              />
            </div>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaLock className="me-2 text-muted" />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="border-0 shadow-none"
                 value={userD.Cpassword}
                onClick={(e)=>{setuserD({...userD,Cpassword:e.target.value})
                }}
              />
            </div>
          </Form.Group> */}

          <Button variant="success" type="submit" className="w-100 fw-bold">
            Register
          </Button>
        </Form>

        <p className="text-center text-white mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className=" fw-bold"
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
