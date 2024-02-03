import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MovieCard } from "../component/movieCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/home.css";

export const Feed = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://humble-goggles-694w7779xjx3xr9-3001.app.github.dev/api/movies");
        const data = await response.json();
        actions.setMovies(data);
      } catch (error) {
        console.error("Error al obtener los datos de las películas:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <MovieCard />
        </div>
      </div>
    </div>
  );
};