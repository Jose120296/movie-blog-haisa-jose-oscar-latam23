import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ComedyMovies } from "./comedyMovie";
import { DramaMovies } from "./dramaMovie";
import { ActionMovies } from "./actionMovie";

export const MovieCard = () => {
  const { store, actions } = useContext(Context);
  const [ratings, setRatings] = useState({});

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
    setRatings((prevRatings) => ({
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
        {store.movies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={movie.poster}
                className="card-img-top"
                alt="Película"
                style={{ objectFit: "cover", width: "100%", height: "400px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length} min</p>
                <div className="rating">
                  <p>Rate this movie:</p>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <span
                      key={value}
                      className={`star ${ratings[movie.id] === value ? "selected" : ""}`}
                      onClick={() => handleRatingChange(movie.id, value)}
                    >
                      {value}
                    </span>
                  ))}
                <div className="d-flex justify-content-between mt-auto">
                  <Link to={`/movies/${movie.id}`} className="btn btn-danger">
                    Ver detalles
                  </Link>
                  <div>
                    <button className="btn btn-danger me-2">
                      <i className="fa-solid fa-star"></i>
                    </button>
                    <button className="btn btn-danger">
                      <i className="fa-solid fa-clock"></i>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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