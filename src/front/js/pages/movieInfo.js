import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CommentSection } from "../component/commentSection";


export const MovieInfo = () => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await fetch(`${store.API_URL}/api/movies/${id}`);
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieInfo();
  }, [id]);

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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0"><strong>{movieInfo.title}</strong></h2>
                <Link to="/feed" className="btn btn-danger">
                  <i className="fa-solid fa-backward me-2"></i>
                  Back
                </Link>
              </div>
              <p className="lead">{movieInfo.genre}</p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Title:</strong> {movieInfo.title}
                </li>
                <li className="mb-2">
                  <strong>Genre:</strong> {movieInfo.genre}
                </li>
                <li className="mb-2">
                  <strong>Length:</strong> {movieInfo.length}
                </li>
                <li className="mb-2">
                  <strong>Release Date:</strong> {movieInfo.release_date}
                </li>
                <li className="mb-2">
                  <strong>Actors:</strong> {movieInfo.actors}
                </li>
                <li>
                  <strong>Description:</strong> {movieInfo.description}
                </li>
              </ul>
            </div>
            <CommentSection movieId={id} />
          </div>
          </div>
        </>
      ) : (
        <p>Loading movie information...</p>
      )}
    </div>
  );
};
