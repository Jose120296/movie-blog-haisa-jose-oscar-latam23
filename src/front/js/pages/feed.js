import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MovieCard } from "../component/movieCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css";
import "../../styles/fondoabsoluto.css";

export const Feed = () => {
  
  return (
    <div className="container mt-5 fondoFeed">
      <div className="row">
        <div className="col">
          <MovieCard />
        </div>
      </div>
    </div>
  );
};