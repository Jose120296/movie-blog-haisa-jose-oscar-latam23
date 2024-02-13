import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from "./card";

export const AnimationMovies = () => {
  const { store, actions } = useContext(Context);
  const [animationMovies, setAnimationMovies] = useState([]);

  useEffect(() => {
    const fetchAnimationMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setAnimationMovies(data.filter(movie => movie.genre.includes("Animation")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas de Animation:", error);
      }
    };

    fetchAnimationMovies();
  }, []);

  if (!animationMovies || animationMovies.length === 0) {
    console.log("No hay datos de películas de Animation disponibles");
    return <div>No hay películas de Animation disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <div className="tittleRow d-flex justify-content-between container fluid mb-3">  
        <h2>
          <strong>Animation</strong>
        </h2>
        <Link to={`/allanimation`} className="btn top btn-danger">
          View all animation movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {animationMovies.map((movie, index) => (
          <Card movie={movie} key={index}/> 
        ))}
      </div>
    </div>
  );
};
