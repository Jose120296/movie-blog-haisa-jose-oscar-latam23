import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import fotoWelcome from "./../../img/Welcome-rafiki.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getMessage();
  }, []);

  return (
    <div className="home-container vistaHome d-flex justify-content-center align-items-center">
		<div className="movieWelcome text-white" style={{backdropFilter: "blur(1000px)"}}>
			<h1  >Welcome to Cineverse</h1>
			<div className="info Welcome mb-3 ">
				<div className="grid-left text-white">
					<p  >
					Explore a wide range of movies across different genres. Whether you're into action, animation, comedy, drama, or family movies, we've got you covered.
					</p>
				</div>
				<div className="grid-right d-flex justify-content-between ">
					<div className="comentWelcome">
						<i className="fa-solid fa-comment"></i>
						<p  ><strong>Give youre opinion about the movie</strong></p>
					</div>  
					<div className="favoritesWelcome"> 
						<i className="fa-solid fa-star"></i>
						<p  ><strong>Add to youre favorite list a movie</strong></p>
					</div> 
					<div className="laterWelcome"> 
						<i className="fa-solid fa-clock"></i>
						<p  ><strong>Add to watch later</strong></p>
					</div>
				</div>
			</div>

			<div className="contenedor mt-4">
				<h6 className="mt-6">Do you have an account?</h6>
				{!store.token ? (
					<Link to="/login">
						<button className="btn" style={{width: "90px"}}>Login</button>
					</Link>
				) : (
					<button onClick={() => actions.logout()} className="contenedor btn" style={{width: "100px"}}>Log Out</button>
				)}
			</div>
				<br />
				<h6 className="mt-6">Are you new? </h6>
				<Link to="/signup" className="contenedor" >
					<button className="btn" style={{width: "90px"}}>Sign Up</button>
				</Link>
			
		</div>
    </div>
);
};