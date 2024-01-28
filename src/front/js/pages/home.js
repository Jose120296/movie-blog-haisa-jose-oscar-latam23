import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/home.css";

export const Home = () => {
  return (
    <div>
      <header className="bg-dark text-light text-center py-3">
        <h1>Cine Verse</h1>
      </header>
      <main className="p-3">
        <h1>Lights Out</h1>
        <p>the 35min | PG</p>
        <p>Released Aug 12, 2019</p>
        <button className="btn btn-primary">GET TICKETS</button>
        <p>1611-000</p>
      </main>
    </div>
  );
};
