import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	useEffect(()=> {
		actions.getMessage();
	}, [])
	
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h1>Log In</h1>
              <div className="mt-4">
                {!store.token ? (
                  <Link to="/login">
                    <button className="btn btn-primary">Please Login</button>
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
  );
};