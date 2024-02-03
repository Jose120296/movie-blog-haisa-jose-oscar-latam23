import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const ComedyMovies = () => {
  const { store, actions } = useContext(Context);
  const [comedyMovies, setComedyMovies] = useState([]);

  useEffect(() => {
    const fetchComedyMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "api/movies");
        const data = await response.json();
        console.log("Data from API:", data);
        actions.setMovies(data);
        setComedyMovies(data.filter(movie => movie.genre.includes("Comedy") ));
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchComedyMovies();
  }, [store.API_URL, actions]);

  if (!comedyMovies || comedyMovies.length === 0) {
    console.log("No hay datos de películas de comedia disponibles");
    return <div>No hay películas de comedia disponibles</div>;
  }

  return (
    <div className="container text-center mt-5">
      <h2 className="text-left">
        <strong>Comedy</strong>
      </h2>
      <div className="row flex-nowrap overflow-auto">
        {comedyMovies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={movie.poster}
                className="card-img-top"
                alt="Película"
                style={{ width: "100%", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length}</p>
                <Link to={`/movies/${movie.id}`} className="btn btn-danger">
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
