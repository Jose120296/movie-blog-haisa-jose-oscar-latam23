// ActionMovies.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const ActionMovies = () => {
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
      }
    };

    fetchActionMovies();
  }, [store.API_URL, actions]);

  if (!actionMovies || actionMovies.length === 0) {
    console.log("No hay datos de películas de acción disponibles");
    return <div>No hay películas de acción disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <h2>
        <strong>Action</strong>
      </h2>
      <div className="row flex-nowrap overflow-auto">
        {actionMovies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card" style={{ width: "18rem" }}>
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
