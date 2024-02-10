// DramaMovies.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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

  const handleRatingChange = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }));
  };

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
        {dramaMovies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={movie.poster}
                className="card-img-top"
                alt="Película"
                style={{ objectFit: "cover", height: "400px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length} min</p>
                <p className="card-text">{movie.release_date}</p>
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
        ))}
      </div>
    </div>
  );
};
