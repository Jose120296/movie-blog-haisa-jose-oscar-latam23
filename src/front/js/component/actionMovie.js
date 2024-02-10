// ActionMovies.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from "./card"

export const ActionMovies = () => {
  const { store, actions } = useContext(Context);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setActionMovies(data.filter(movie => movie.genre.includes("Action")));
      } catch (error) {
      }
    };

    fetchActionMovies();
  }, []);

  

  if (!actionMovies || actionMovies.length === 0) {
    console.log("No hay datos de películas de acción disponibles");
    return <div>No hay películas de acción disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <div className="d-flex justify-content-between container fluid">  
        <h2>
          <strong>Action</strong>
        </h2>
        <Link to={`/allactions`} className="btn btn-danger">
          View all action movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {actionMovies.map((movie, index) => {
          return(
          <Card movie={movie} key={index}/> 
        )})}

      </div>
    </div>
  );
};

//{actionMovies.map((movie, index) => (