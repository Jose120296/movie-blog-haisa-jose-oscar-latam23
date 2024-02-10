// DramaMovies.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from "./card"

export const DramaMovies = () => {
  const { store, actions } = useContext(Context);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});


  useEffect(() => {
    const fetchDramaMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setDramaMovies(data.filter(movie => movie.genre.includes("Drama")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchDramaMovies();
  }, []);

  if (!dramaMovies || dramaMovies.length === 0) {
    console.log("No hay datos de películas de drama disponibles");
    return <div>No hay películas de drama disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <div className="d-flex justify-content-between container fluid">  
        <h2>
          <strong>Drama</strong>
        </h2>
        <Link to={`/alldrama`} className="btn btn-danger">
          View all drama movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {dramaMovies.map((movie, index) => {
          return(
          <Card movie={movie} key={index}/> 
        )})}

      </div>
    </div>
  );
};
