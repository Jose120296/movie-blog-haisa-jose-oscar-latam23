import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ComedyMovies } from "./comedyMovie";


export const MovieCard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "api/movies");
        const data = await response.json();
        console.log("Data from API:", data);
        actions.setMovies(data);
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log("Store:", store);

  // Verificar si los datos de la película están disponibles
  if (!store.movies || store.movies.length === 0) {
    console.log("No hay datos de películas disponibles");
    return <div>No hay películas disponibles</div>;
  }

  // Filtrar las películas de comedia
  const comedyMovies = store.movies.filter((movie) => movie.genre === "Comedy");

  // Filtrar las películas de acción
  const actionMovies = store.movies.filter((movie) => movie.genre === "Action");

  return (
    <div className="container text-center mt-5">
      <h2 className="text-left danger">
        <strong>All movies</strong>
      </h2>
      <div className="row flex-nowrap overflow-auto">
        {store.movies.map((movie, index) => (
          <div className="col" style={{ marginBottom: "10px" }} key={index}>
            <div className="card h-100" style={{ width: "18rem" }}>
              <img
                src={movie.poster}
                className="card-img-top"
                alt="Película"
                style={{ objectFit: "contain", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length} min</p>
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

      <br />
      <ComedyMovies />
    </div>
  );
};