import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const GetAnimationMovies = () => {
  const { store, actions } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(9);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});

  useEffect(() => {
    const fetchAnimationMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setAnimationMovies(data.filter(movie => movie.genre.includes("Animation")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas de animación:", error);
      }
    };

    fetchAnimationMovies();
  }, []);

  const handleRatingChange = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }));
  };

  if (!animationMovies || animationMovies.length === 0) {
    console.log("No hay datos de películas de animación disponibles");
    return <div>No hay películas de animación disponibles</div>;
  }

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = animationMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid text-left mt-45" style={{ width: "90vw", marginTop: "7rem" }}>
      <div className="tittleRow d-flex justify-content-between mb-3">
        <h2><strong>Animation Movies</strong></h2>
        <Link to={`/feed`} className="btn btn-danger">View all movies</Link>
      </div>
      <div className="xCard row card-container">
        {currentMovies.map((movie, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card horizontal" style={{ width: "100%", backgroundColor: "#5576B8" }}>
              <div className="row no-gutters">
                <div className="col">
                  <img src={movie.poster} className="card-img" alt="Película" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h2 className="card-title"><strong>{movie.title}</strong></h2>
                    <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                    <p className="card-text horizontal">{movie.description}</p>
                    <p className="card-text"><strong>Length:</strong> {movie.length} min</p>
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
                      <Link to={`/movies/${movie.id}`} className="btn btn-warning">View details</Link>
                      <div>
                        <button className="btn btn-warning me-2"><i className="fa-solid fa-star"></i></button>
                        <button className="btn btn-warning"><i className="fa-solid fa-clock"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {Array.from({ length: Math.ceil(animationMovies.length / moviesPerPage) }, (_, i) => (
            <li className={`page-item ${currentPage === i + 1 ? "active" : ""}`} key={i}>
              <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(animationMovies.length / moviesPerPage) ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
