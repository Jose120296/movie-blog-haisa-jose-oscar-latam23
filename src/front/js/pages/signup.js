import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    actions.signup(email, password);
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
    <div className="home-container">
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center">
                <h1 className="mb-4">Please Sign Up</h1>
                {store.token && store.token !== "" && store.token !== undefined ? (
                  <p>You are logged in with this token: {store.token}</p>
                ) : (
                  <div className="mt-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary btn-block mb-3" onClick={handleClick}>
                      Sign Up
                    </button>
                    <p>Already have an account?</p>
                    <Link to="/login">
                      <button className="btn btn-primary btn-block" onClick={handleLoginClick}>
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};