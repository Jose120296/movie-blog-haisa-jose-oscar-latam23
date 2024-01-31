import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

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
    <div className="movie-info">
      {movieInfo ? (
        <>
          <div className="row">
            <div className="col-md-4">
              <img
                src={movieInfo.poster}
                alt={movieInfo.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h2>{movieInfo.title}</h2>
              <p className="lead">{movieInfo.genre}</p>
            </div>
          </div>
          <div className="mt-4">
            <hr />
            <p>
              <strong>Title:</strong> {movieInfo.title}
            </p>
            <p>
              <strong>Genre:</strong> {movieInfo.genre}
            </p>
            <p>
              <strong>Length:</strong> {movieInfo.length}
            </p>
            <p>
              <strong>Release Date:</strong> {movieInfo.release_date}
            </p>
            <p>
              <strong>Actors:</strong> {movieInfo.actors}
            </p>
            <p>
              <strong>Description:</strong> {movieInfo.description}
            </p>
            {/* Agrega más detalles de la película según sea necesario */}
          </div>
        </>
      ) : (
        <p>Loading movie information...</p>
      )}
    </div>
  );
};