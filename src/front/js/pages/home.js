import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/popularMovies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMovies(data.results))
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);

  return (
    <div className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {movies.map((movie, index) => (
          <li key={movie.id} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {movies.map((movie, index) => (
          <div key={movie.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={movie.posterUrl} alt={movie.title} />
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

