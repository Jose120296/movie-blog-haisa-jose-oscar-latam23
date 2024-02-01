import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

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
    <div className="home-container d-flex justify-content-center align-items-center" style={{fontFamily: "Agbalumo"}}>
      	<div className="col-md-6">
        	<div className="container d-flex border border-light">
          		<div className="card-body text-center">
            		<h1 className="mb-4">Please Login</h1>
              		{store.token && store.token !== "" && store.token !== undefined ? (
						<p>You are logged in with this token: {store.token}</p>
              		) : (
					<div className="mt-4">
						<div className="form-group">
						<input
							type="text"
							className="form-control"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						</div>
						<div className="form-group">
						<input
						type="password"
						className="form-control"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						/>
						</div>
						<button className="btn btn-danger btn-block mb-3" onClick={handleClick}>
						Login
						</button>
						<p>Don't have an account?</p>
						<Link to="/signup">
						<button className="btn btn-danger btn-block" onClick={handleSignupClick}>
							Sign up
						</button>
						</Link>
					</div>
            	)}
		  		
        	</div>
			<div className="container">
				<img src="../../img/Welcome-rafiki.png" alt="imagen"/>
		  	</div>
        </div>
      </div>
    </div>
  );
};