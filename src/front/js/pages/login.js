import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/login.css";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    await actions.login(email, password);
    navigate("/feed"); // Redirigir a la vista del feed después de iniciar sesión
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    actions.getMessage();
    if (store.token && store.token !== "" && store.token !== undefined) {
      navigate("/feed"); // Redirigir a la vista del feed si ya está autenticado
    }
  }, []);

  return (
    <div className="home-container loginVista d-flex justify-content-center align-items-center" >
      	
        <div className="contenedorLogin container d-flex justify-content-center align-items-center " style={{backdropFilter: "blur(1000px)"}}>
        	<div className="loginContainer">
           		<h1 className="mb-4">Login</h1>
           		{store.token && store.token !== "" && store.token !== undefined ? (
					<p>You are logged in with this token: {store.token}</p>
           		) : (
				<div className="contenedor mt-4">
					<div className="form-group mb-2">
						<input 
							type="text"
							className="form-control"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
							<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
						</svg>
					</div>
					<div className="form-group">
						<input
						type="password"
						className="form-control"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
  							<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
						</svg>
					</div>
					<button className="btn" onClick={handleClick}>
					Login
					</button>
					<p><strong>Don't have an account?</strong> <Link to="/signup" style={{color: "white", textDecoration: "none"}}> Sign up  </Link></p>
					
				</div>
           		)}
	  		
       		</div>
        
      	</div>

    </div>
  );
};