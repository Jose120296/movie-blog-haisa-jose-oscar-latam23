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

      <div className="contenedorLogin container d-flex justify-content-center align-items-center" style={{backdropFilter: "blur(1000px)"}}>
        <div className="loginContainer" >
         	<h1 className="mb-4">Please, Sing Up</h1>
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
            <div className="contenedor mt-4">
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
              <button className=" btn mb-3" onClick={handleClick}>
                Sign Up
              </button>
              <p>Already have an account?</p>
              <Link to="/login">
                <button className=" btn" onClick={handleLoginClick}>
                  Login
                </button>
              </Link>
            </div>
          )}
	  		
       	</div>
        
      </div>


    </div>
  );
};