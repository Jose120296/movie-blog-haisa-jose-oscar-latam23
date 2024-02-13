import React, { useContext, useState , useEffect} from "react";
import { Link, useNavigate, } from "react-router-dom";
import { Context } from '../store/appContext';
import logoNav from "./../../img/logoRojo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  
  
  const handleSignOut = () => {
    actions.logout();
    navigate('/');
  };

  
  return (
    <nav className="navbar navbar-dark fixed-top" style={{backgroundColor: "trasparent"}}>
      <div className="container-fluid">

        <Link to="/feed"  style={{ borderRadius: "5px", fontFamily: "Bebas Neue" }}>
          <img src={logoNav} alt="imagen" className="img-fluid" style={{width: "10rem"}}/>
        </Link>




       <div className="container d-flex justify-content-end align-items-baseline">
         <Link className="nav-link" to="/feed" style={{ color: 'white', fontSize: '15px' }}>Home</Link>


         {store.token ? (
        <div className="btn-group ms-2">
          <button
            className="btn dropdown-toggle "
            style={{ backgroundColor: 'transparent', color: 'white'}}
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2 11.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.5-3a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11z"
              />
            </svg>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: 'transparent', color: 'white',  fontSize: '15px' }} >

            <li>
              <Link className="dropdown-item" to="/demo" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '15px' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                Perfil
              </Link>
            </li>
            <li>
            <button className="dropdown-item" style={{ backgroundColor: 'transparent', color: 'white', fontSize: '15px' }}>
              <Link className="nav-link" to="/feed">About us</Link>
            </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleSignOut} style={{ backgroundColor: 'transparent', color: 'white',  fontSize: '15px' }}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      ) : null}
       </div>

      

      
            
      </div>
    </nav>
  )
};
