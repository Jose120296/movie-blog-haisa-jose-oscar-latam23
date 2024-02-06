import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";
import imglogin from "./../../img/imglogin.png";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    actions.signup(email, password, username);
    setShowAlert(true);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    actions.getMessage();
  }, []);

  if (store.token && store.token !== "" && store.token !== undefined) {
    navigate("/");
  }

  return (
    <div className="home-container d-flex justify-content-center align-items-center" style={{ fontFamily: "Agbalumo" }}>
      <div className="col-md-6 border border-light bg-secondary" style={{ borderRadius: "10px" }}>
        <div className="container d-flex">
          <div className="card-body text-center">
            <h1 className="mb-4">Please Sign Up</h1>
            {showAlert && (
                  <div className="alert alert-success" role="alert">
                User created! Please go to login.
				<br></br>
                <Link to="/login">
                  <button className="btn btn-danger btn-block" onClick={handleLoginClick}>
                    Login
                  </button>
                </Link>
              </div>
            )}
            {!showAlert && (
              <div className="mt-4">
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="username"
                    className="form-control"
                    placeholder="@Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <button className="btn btn-danger btn-block mb-3" onClick={handleClick}>
                  Sign Up
                </button>
                <p>Already have an account?</p>
                <Link to="/login">
                  <button className="btn btn-danger btn-block" onClick={handleLoginClick}>
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="container">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="imagen" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};