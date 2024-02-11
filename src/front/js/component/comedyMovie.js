import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from "./card"


export const ComedyMovies = () => {
  const { store, actions } = useContext(Context);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});

  useEffect(() => {
    const fetchComedyMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setComedyMovies(data.filter(movie => movie.genre.includes("Comedy") ));
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchComedyMovies();
  }, []);


  if (!comedyMovies || comedyMovies.length === 0) {
    console.log("No hay datos de películas de comedia disponibles");
    return <div>No hay películas de comedia disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <div className="d-flex justify-content-between container fluid">  
        <h2>
          <strong>Comedy</strong>
        </h2>
        <Link to={`/allcomedy`} className="btn btn-danger">
          View all comdey movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {comedyMovies.map((movie, index) => {
          return(
          <Card movie={movie} key={index}/> 
        )})}
      </div>
    </div>
  );
};
