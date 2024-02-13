import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import fotoWelcome from "./../../img/Welcome-rafiki.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMessage();
  }, []);

  return (
    <div className="home-container vistaHome d-flex justify-content-center align-items-center">
      <div className="col-md-6 border border-light bg-secondary" >
        <div className="container d-flex">
          <div className="container">
            <h1 className="mb-4">Welcome!</h1>
            <div className="mt-4">
              <h6 className="mt-6">Do you have an account?</h6>
              {!store.token ? (
                <Link to="/login">
                  <button className="btn btn-danger">Login</button>
                </Link>
              ) : (
                <button onClick={() => actions.logout()} className="btn btn-danger">Sign Out</button>
              )}
            </div>
            <br />
            <h6 className="mt-6">Are you new? </h6>
            <Link to="/signup">
              <button className="btn btn-danger">Sign Up</button>
            </Link>
          </div>
          <div className="container">
            <img src={fotoWelcome} alt="imagen" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};