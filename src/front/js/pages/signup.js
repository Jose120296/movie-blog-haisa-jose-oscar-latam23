import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js'
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup = () => {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleClick = () => {
        actions.signup (email, password);
    }

    const handleLoginClick = () => {
        navigate('/login');
      };
    
    return (
        <div className="text-center mt-5">
            <h1> Please Sign Up</h1>
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Sign Up</button>
                <p className="mt-3">Have an account? </p>
                <button className="btn btn-primary" onClick={handleLoginClick}>Login</button> 
            </div>
        </div>
    )
};