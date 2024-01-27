import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";


export const Feed = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home-container">
        <div className="grid">
            <div className="card-body text-center">
                <div className="g-col-4">
                    <img src="https://via.placeholder.com/300x200" className="img-thumbnail" alt="Descripción de la imagen 1" />
                </div>
                <div className="g-col-4">
                    <img src="https://via.placeholder.com/300x200" className="img-thumbnail" alt="Descripción de la imagen 2" />
                </div>
                <div className="g-col-4">
                    <img src="https://via.placeholder.com/300x200" className="img-thumbnail" alt="Descripción de la imagen 3" />
                </div>
            </div>
        </div>
    </div>
  );
};