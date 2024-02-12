import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";



export const Card = ({movie}) => {
  const { store, actions } = useContext(Context);
  const [movieRatings, setMovieRatings] = useState({});
  const handleRatingChange = (movieId, rating) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating
    }));
  };
  const movieDate = new Date(movie.release_date)
          const mesesDelAño = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
          ]
          const movieCardDate = `${movieDate.getDate()} de ${mesesDelAño[movieDate.getMonth()]} del ${movieDate.getFullYear()} `

    
        
          
          return(
            <div className="col" style={{ marginRight: "10px", marginBottom: "10px" }}>
              <div className="card h-100" style={{ width: "18rem" }}>
                <img
                  src={movie.poster}
                  className="card-img-top"
                  alt="Película"
                  style={{ objectFit: "cover", width: "100%", height: "400px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.genre}</p>
                  <p className="card-text">{movie.length} min</p>
                  <p className="card-text">{movieCardDate}</p>
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
                  <div className="movieCardsButton d-flex justify-content-between mt-auto" style={{padding: "0 6px"}}>
                    <Link to={`/movies/${movie.id}`} className="btn btn-danger">
                      Ver detalles
                    </Link>
                    <div>
                      <button className="btn btn-danger me-2" onClick={() =>{actions.addFavorite(movie.id)} }>
                        <i className="fa-solid fa-star"></i>
                      </button>
                      <button className="btn btn-danger" onClick={() =>{actions.addSeelater(movie.id)} }>
                        <i className="fa-solid fa-clock"></i>
                      </button>
                    </div>
                </div>
                </div>
              </div>
            </div>     
  );
};
