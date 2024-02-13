import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ActionMovies } from "./actionMovie";
import { AnimationMovies } from "./animationMovie";
import { ComedyMovies } from "./comedyMovie";
import { DramaMovies } from "./dramaMovie";
import { FamilyMovies } from "./famliyMovie";
import { Card } from "./card"


export const MovieCard = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="text-left mt-5">
      <div className="movieWelcome">
        <h1>Welcome to Cineverse</h1>
        <div className="info Welcome mb-3">
          <div className="grid-left">
            <p>
              Explore a wide range of movies across different genres. Whether you're into action, animation, comedy, drama, or family movies, we've got you covered.
            </p>
          </div>
          <div className="grid-right d-flex justify-content-between">
            <div className="comentWelcome">
              <i className="fa-solid fa-comment"></i>
              <p><strong>Give youre opinion about the movie</strong></p>
            </div>  
            <div className="favoritesWelcome"> 
              <i className="fa-solid fa-star"></i>
              <p><strong>Add to youre favorite list a movie</strong></p>
            </div> 
            <div className="laterWelcome"> 
              <i className="fa-solid fa-clock"></i>
              <p><strong>Add to watch later</strong></p>
            </div>
          </div>
        </div>
          <Link to="/allmovies" className="btn btn-danger">
            View All Movies
          </Link>
      </div>
      <br />
      <ActionMovies />
      <br/>
      <AnimationMovies />
      <br/>
      <ComedyMovies />
      <br/>
      <DramaMovies/>
      <br/>
      <FamilyMovies/>
    </div>
  );
};

