import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMessage();
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body text-center">
                <h1 className="mb-4">CineVerse</h1>
                <div className="mt-4">
                  {!store.token ? (
                    <Link to="/login">
                      <button className="btn btn-primary">Login</button>
                    </Link>
                  ) : (
                    <button onClick={() => actions.logout()} className="btn btn-primary">
                      Sign Out
                    </button>
                  )}
                </div>
                <h3 className="mt-4">or</h3>
                <Link to="/signup">
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};