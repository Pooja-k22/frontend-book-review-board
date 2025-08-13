import React, { useContext, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../services/allApi";
import { tokenContext } from "../context/CreateContext";

function Login() {
  const {setToken}= useContext(tokenContext)
  const navigate = useNavigate();
  const [userD, setuserD] = useState({
    email: "",
    password: "",
  });

  // api call register
  const login = async (e) => {
    e.preventDefault();
    const { email, password } = userD;
    if (!email | !password) {
      alert("please fill all field");
    } else {
      const result = await loginApi({ email, password });
      console.log(result.data);

      if (result.status == 200) {
        alert("login successfull");
        localStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token)
        navigate("/");
      } else if (result.status == 401 || result.status == 409) {
        alert(result.response.data);
        setuserD({
          email: "",
          password: "",
        });
      } else {
        alert("Something went wrong");
        setuserD({
          email: "",
          password: "",
        });}
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
        <h3 className="text-center text-white mb-4">Login</h3>
        <Form onSubmit={login}>
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-2">
              <FaUser className="me-2 text-muted" />
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

          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Login
          </Button>
        </Form>

        <p className="text-center text-white mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-warning fw-bold">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
