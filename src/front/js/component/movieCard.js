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
      <div className="container d-flex justify-content-center align-items-center">
      <Link to="/allmovies" className="btn btn-danger">
        View All Movies
      </Link>
      </div>
      
      <br/>
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

