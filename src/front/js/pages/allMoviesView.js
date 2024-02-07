import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const GetGenresMovies = () => {
  const { store, actions } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);

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

  // Verificar si los datos de la película están disponibles
  if (!store.movies || store.movies.length === 0) {
    console.log("No hay datos de películas disponibles");
    return <div>No hay películas disponibles</div>;
  }

  // Obtener el índice del último y primer elemento de cada página
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = store.movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid text-left mt-45" style={{ width: "90vw", marginTop: "7rem" }}>
      <div className="d-flex justify-content-between">
        <h2>
          <strong>All movies</strong>
        </h2>
        <Link to={`/feed`} className="btn btn-danger">
          View all movies
        </Link>
      </div>
      <div className="row card-container">
        {currentMovies.map((movie, index) => (
          <div className="col-md-4 mb-4" style={{}} key={index}>
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
                    <p className="card-text">{movie.description}</p>
                    <p className="card-text">
                      <strong>Length:</strong> {movie.length} min
                    </p>
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

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: Math.ceil(store.movies.length / moviesPerPage) }, (_, i) => (
            <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(store.movies.length / moviesPerPage) ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>

      <style>
        {`
            .card-title {
                font-size: 1.75rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }

            .card-text {
                font-size: 1.0rem;
                margin-bottom: 0.5rem;
            }
            .card-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
          
            .col-md-4 {
              flex-basis: calc(33.33% - 1rem);
              margin-bottom: 2rem;
            }
        `}
      </style>
    </div>
  );
};