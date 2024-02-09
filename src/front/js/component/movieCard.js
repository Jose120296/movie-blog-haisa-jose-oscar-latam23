import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ComedyMovies } from "./comedyMovie";
import { DramaMovies } from "./dramaMovie";
import { ActionMovies } from "./actionMovie";
import { Card } from "./card"


export const MovieCard = () => {
  const { store, actions } = useContext(Context);
  const [movieRatings, setMovieRatings] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "api/movies");
        const data = await response.json();
        actions.setMovies(data);
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleRatingChange = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }));
  };

  // Verificar si los datos de la película están disponibles
  if (!store.movies || store.movies.length === 0) {
    console.log("No hay datos de películas disponibles");
    return <div>No hay películas disponibles</div>;
  }

  

  return (
    <div className="container text-left mt-5">
      <div className="d-flex justify-content-between container fluid">  
        <h2>
          <strong>All movies</strong>
        </h2>
        <Link to={`/allmovies`} className="btn btn-danger">
          View all movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {store.movies.map((movie, index) => {
          
          return(
          <Card movie={movie} key={index}/> 
        )})}
      </div>
      <br />
      <ActionMovies />
      <br/>
      <ComedyMovies />
      <br/>
      <DramaMovies/>
    </div>
  );
};
