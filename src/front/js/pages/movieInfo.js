import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const MovieInfo = () => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await fetch(`${store.API_URL}api/movies/${id}`);
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieInfo();
  }, [id, store.API_URL]);

  return (
    <div className="movie-info-container">
      {movieInfo ? (
        <>
          <div className="row">
            <div className="col-md-4">
              <img
                src={movieInfo.poster}
                alt={movieInfo.title}
                className="movie-poster img-fluid"
              />
            </div>
            <div className="col-md-8">
              <div className="movie-details">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  {/* Asegúrate de que el título no esté dentro del div d-flex */}
                  <h2>{movieInfo.title}</h2>
                  <Link to="/feed" className="btn btn-danger">
                    <i class="fa-solid fa-backward"></i>
                  </Link>
                </div>
                <p className="lead">{movieInfo.genre}</p>
                <ul>
                  <li>
                    <strong>Title:</strong> {movieInfo.title}
                  </li>
                  <li>
                    <strong>Genre:</strong> {movieInfo.genre}
                  </li>
                  <li>
                    <strong>Length:</strong> {movieInfo.length}
                  </li>
                  <li>
                    <strong>Release Date:</strong> {movieInfo.release_date}
                  </li>
                  <li>
                    <strong>Actors:</strong> {movieInfo.actors}
                  </li>
                  <li>
                    <strong>Description:</strong> {movieInfo.description}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading movie information...</p>
      )}
    </div>
  );
};
