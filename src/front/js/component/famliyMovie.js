import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from "./card";

export const FamilyMovies = () => {
  const { store, actions } = useContext(Context);
  const [familyMovies, setFamilyMovies] = useState([]);

  useEffect(() => {
    const fetchFamilyMovies = async () => {
      try {
        const response = await fetch(store.API_URL + "/api/movies");
        const data = await response.json();
        actions.setMovies(data);
        setFamilyMovies(data.filter(movie => movie.genre.includes("Family")));
      } catch (error) {
        console.error("Error al obtener los datos de las películas de Family:", error);
      }
    };

    fetchFamilyMovies();
  }, []);

  if (!familyMovies || familyMovies.length === 0) {
    console.log("No hay datos de películas de Family disponibles");
    return <div>No hay películas de Family disponibles</div>;
  }

  return (
    <div className="container text-left mt-5">
      <div className="tittleRow d-flex justify-content-between container fluid mb-3">  
        <h2>
          <strong>Family</strong>
        </h2>
        <Link to={`/allfamily`} className="btn top btn-danger">
          View all family movies
        </Link>
      </div>
      <div className="row flex-nowrap overflow-auto">
        {familyMovies.map((movie, index) => (
          <Card movie={movie} key={index}/> 
        ))}
      </div>
    </div>
  );
};
