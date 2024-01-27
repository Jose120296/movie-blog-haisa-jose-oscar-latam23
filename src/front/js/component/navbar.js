import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSignOut = () => {
    actions.logout(); // Lógica para el cierre de sesión
    navigate('/'); // Redirigir al usuario a la ruta "/"
  };

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand mb-2 h1 bg-primary text-white">
          Cine Verse
        </Link>
        <div className="ml-auto">  
          {!store.token ? (
            <Link to="/login">
              <button className="btn btn-primary">Join Now</button>
            </Link>
          ) : (
            <button onClick={handleSignOut} className="btn btn-primary">Log in</button>
          )}
        </div>
      </div>
    </nav>
  );
};