import React, { useContext, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Context } from '../store/appContext';
import logoNav from "./../../img/logoNav.png";


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  
  const handleSignOut = () => {
    actions.logout();
    navigate('/');
  };

 



  
  return (
    <nav className="navbar navbar-dark fixed-top" style={{backgroundColor: "rgb(8, 19, 36)"}}>
      <div className="container-fluid">

        <Link to="/feed" className="navbar-brand mb-2 h1 text-white" style={{ borderRadius: "5px", fontFamily: "Bebas Neue" }}>
          <img src={logoNav} alt="imagen" className="img-fluid" style={{width: "10rem"}}/>
        </Link>

        <button className="btn btn-secondary">
          <Link className="nav-link" to="/feed" >Home</Link>
        </button>

        <button className="btn btn-secondary">
          <Link to="/demo" className="btn">   
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
          </Link>
        </button>

        <button className="btn btn-secondary">
          <Link className="nav-link" to="/feed" >About us</Link>
        </button> 

        <button className="btn btn-secondary" onClick={handleSignOut}>
          <a className="logOut">Log out</a>
        </button>
        
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-success" type="submit">Search</button>
        </form>
        
            
      </div>
    </nav>
  );
  }