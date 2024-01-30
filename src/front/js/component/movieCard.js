import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";

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

  console.log("Store:", store); // Mensaje de depuración

  // Verificar si los datos de la película están disponibles
  if (!store.movies || store.movies.length === 0) {
    console.log("No hay datos de películas disponibles"); // Mensaje de depuración
    return <div>No hay películas disponibles</div>;
  }

  // Filtrar las películas de comedia
  const comedyMovies = store.movies.filter(movie => movie.genre === "Comedy");

  // Filtrar las películas de acción
  const actionMovies = store.movies.filter(movie => movie.genre === "Action");

  return (
    <div className="container text-center mt-5">
      <h2 className="text-left danger">
        <strong>All movies</strong>
      </h2>
      <div className="row flex-nowrap overflow-auto">
        {store.movies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={movie.poster} className="card-img-top" alt="Película" style={{ width: "100%", height: "200px" }} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />

      <h2 className="text-left danger">
        <strong>Action</strong>
      </h2>
      <div className="row flex-nowrap overflow-auto">
        {actionMovies.map((movie, index) => (
          <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }} key={index}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={movie.poster} className="card-img-top" alt="Película" style={{ width: "100%", height: "200px" }} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};