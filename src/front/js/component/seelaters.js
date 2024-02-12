import React, { useContext, useEffect, useState, } from "react";
import { Context } from "../store/appContext";

export function Seelaters () {
    const { store, actions } = useContext(Context);

  
    useEffect(() => {
        actions.getSeelaters();
    }, []);

    return (
      <div>
        <h1>See later</h1>
        <div className="row flex-nowrap overflow-auto">

          {store.seelaters?.map((seelater, index) => (
            <div className= "seelatercard w-auto"  key={index}>
              <p>{seelater.movie.title}</p>
              <img
                src={seelater.movie.poster}
                className="card-img-top"
                alt="Película"
                style={{ objectFit: "cover", width: "18rem", height: "400px" }}
              />
              <div className="iconoDelete">
          <button className="btn btn-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </div>
            </div>
          ))}
        </div>
        
      </div>
    );

}