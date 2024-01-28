import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css";
import { Footer } from "../component/footer";

export const Feed = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const apiKey = "8625bab00ddcdc7ae2bb6b2892eae6e4";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        actions.setPopularMovies(data.results);
      } catch (error) {
        console.error("Error al obtener los datos de las películas populares:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="wrapper">
        <div className="home-container">
            <div className="row">
                {store.popularMovies &&
                store.popularMovies.length > 0 &&
                store.popularMovies.map((movie) => (
                    <div className="col-md-4" key={movie.id}>
                    <div className="card-body text-center">
                        <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        className="img-thumbnail"
                        alt={movie.title}
                        />
                        <h5>{movie.title}</h5>
                        <p>{movie.release_date}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
  );
};

//8625bab00ddcdc7ae2bb6b2892eae6e4