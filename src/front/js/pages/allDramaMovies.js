import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const GetDramaMovies = () => {
  const { store, actions } = useContext(Context);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});


  useEffect(() => {
    const fetchDramaMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setDramaMovies(data.filter(movie => movie.genre.includes("Drama")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas de drama:", error);
      }
    };

    fetchDramaMovies();
  }, []);
  const handleRatingChange = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }));
  };

  // Verificar si los datos de la película están disponibles
  if (!dramaMovies || dramaMovies.length === 0) {
    console.log("No hay datos de películas de drama disponibles");
    return <div>No hay películas de drama disponibles</div>;
  }

  return (
    <div className="container-fluid text-left mt-45" style={{ width: "90vw", marginTop: "7rem" }}>
      <div className="d-flex justify-content-between">
        <h2>
          <strong>Drama movies</strong>
        </h2>
        <Link to={`/feed`} className="btn btn-danger">
          View all movies
        </Link>
      </div>
      <div className="row">
        {dramaMovies.map((movie, index) => (
          <div
            className="col-md-4 mb-4"
            style={{}}
            key={index}
          >
            <div className="card" style={{ width: "100%", backgroundColor: "#5576B8" }}>
              <div className="row no-gutters">
                <div className="col">
                  <img
                    src={movie.poster}
                    className="card-img"
                    alt="Película"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title">
                      <strong>{movie.title}</strong>
                    </h2>
                    <p className="card-text">
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p className="card-text">
                      <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p className="card-text">
                      <strong>Length:</strong> {movie.length} min
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong> {movie.description}
                    </p>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`star ${movieRatings[movie.id] && movieRatings[movie.id] >= value ? "selected" : ""}`}
                          onClick={() => handleRatingChange(movie.id, value)}
                        >
                          &#9733; 
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between mt-auto">
                      <Link to={`/movies/${movie.id}`} className="btn btn-warning">
                        View details
                      </Link>
                      <div>
                        <button className="btn btn-warning me-2">
                          <i className="fa-solid fa-star"></i>
                        </button>
                        <button className="btn btn-warning">
                          <i className="fa-solid fa-clock"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
            .card-title {
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 1rem;
                color: white;
            }

            .card-text {
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
                color: white;
            }

        `}
      </style>
    </div>
  );
};