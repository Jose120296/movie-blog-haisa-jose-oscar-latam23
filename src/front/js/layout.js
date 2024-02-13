import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { GetGenresMovies } from "./pages/allMoviesView";
import { GetActionMovies } from "./pages/allActionsMovies";
import { GetComedyMovies } from "./pages/allComedyMovies";
import { GetDramaMovies } from "./pages/allDramaMovies";
import { GetFamilyMovies } from "./pages/allFamilyMovie";
import { GetAnimationMovies } from "./pages/allAnimationMovies";
import { Feed } from "./pages/feed";
import { MovieInfo } from "./pages/movieInfo"; 
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ActionMovies } from "./component/actionMovie";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Feed />} path="/feed" />
                        <Route element={<GetGenresMovies />} path="/allmovies" />
                        <Route element={<GetActionMovies />} path="allactions" />
                        <Route element={<GetAnimationMovies />} path="allanimation" />
                        <Route element={<GetFamilyMovies />} path="allfamily" />
                        <Route element={<GetComedyMovies />} path="allcomedy" />
                        <Route element={<GetDramaMovies />} path="alldrama" />
                        <Route element={<MovieInfo />} path="/movies/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
