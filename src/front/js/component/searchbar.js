import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ComedyMovies } from "./comedyMovie";
import { DramaMovies } from "./dramaMovie";
import { ActionMovies } from "./actionMovie";
import { Card } from "./card"



export function Searchbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

   const petitionGet = () => {
       axios.get('${process.env.BACKEND_URL}/api/hello')
           setSearchTerm((response) => {
               setSearchResults(response.data);
           })
            .catch((error) => {
                console.log(error);
            });
   }

    useEffect(() => {
        //petitionGet();
    }, []);

   return (
        <div className="container text-left mt-5">
           <div className="d-flex justify-content-between container fluid">
             <h2>
               <strong>All movies</strong>
              </h2>
                <Link to={`/allmovies`} className="btn btn-danger">
                    View all movies
               </Link>
            </div>
            <div className="row flex-nowrap overflow-auto">
                {store.movies.map((movie, index) => {
                   return (
                        <Card movie={movie} key={index} />
                    )
               })}
           </div>
            <br />
            <ActionMovies/>
            <br />
            <ComedyMovies/>
            <br />
            <DramaMovies/>
        </div>
    );
};

