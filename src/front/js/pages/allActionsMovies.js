import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const GetActionMovies = () => {
  const { store, actions } = useContext(Context);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setActionMovies(data.filter(movie => movie.genre.includes("Action")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas de acción:", error);
      }
    };

    fetchActionMovies();
  }, []);

  // Verificar si los datos de la película están disponibles
  if (!actionMovies || actionMovies.length === 0) {
    console.log("No hay datos de películas de acción disponibles");
    return <div>No hay películas de acción disponibles</div>;
  }

  return (
    <div className="container-fluid text-left mt-45" style={{ width: "90vw", marginTop: "7rem" }}>
      <div className="d-flex justify-content-between">
        <h2>
          <strong>Action movies</strong>
        </h2>
        <Link to={`/feed`} className="btn btn-danger">
          View all movies
        </Link>
      </div>
      <div className="row">
        {actionMovies.map((movie, index) => (
          <div
            className="col-md-4 mb-4"
            style={{}}
            key={index}
          >
            <div className="card" style={{ width: "100%" }}>
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
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-text">{movie.genre}</p>
                    <p className="card-text">{movie.release_date}</p>
                    <p className="card-text">{movie.description}</p>
                    <p className="card-text">{movie.length} min</p>
                    <div className="d-flex justify-content-between mt-auto">
                      <Link to={`/movies/${movie.id}`} className="btn btn-danger">
                        View details
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
          </div>
        ))}
      </div>
    </div>
  );
};