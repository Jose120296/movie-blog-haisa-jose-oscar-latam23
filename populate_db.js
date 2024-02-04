const fetch = require('node-fetch');


const MOVIES_API_REQUEST = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=66&sort_by=popularity.desc";
const GENRES_API_REQUEST = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const PROJECT_API = 'https://humble-goggles-694w7779xjx3xr9-3001.app.github.dev';

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI1YmFiMDBkZGNkYzdhZTJiYjZiMjg5MmVhZTZlNCIsInN1YiI6IjY1YjY4MjI4MmZhZjRkMDBjOWRjMWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9zmeG3eL_llYOqDbxQS1AHjVg7v0qleM5M83PGF26tA"; 

const getMovies = async () => {
    try {
        const response = await fetch(MOVIES_API_REQUEST, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        const body = await response.json();
        return body.results || [];
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        return [];
    }
};

const sendMovie = async (movieData) => {
    try {
        const response = await fetch(`${PROJECT_API}/api/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        });

        if (!response.ok) {
            console.error(`Error al enviar la película: ${movieData.title}`);
            console.error(`Estado de la respuesta: ${response.status}`);
        } else {
            console.log(`Película enviada correctamente: ${movieData.title}`);
        }
    } catch (error) {
        console.error(`Error al enviar la película: ${movieData.title}`, error);
    }
};


const getGenres = async () => {
    try {
        const response = await fetch(GENRES_API_REQUEST, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        const body = await response.json();
        return body.genres || [];
    } catch (error) {
        console.error("Error al obtener los géneros:", error);
        return [];
    }
};


const populate = async () => {
    try {
        const movies = await getMovies();
        const genres = await getGenres();

        for (let movie of movies) {
            const { data, success } = await getMovie(movie.id);

            if (!success) {
                continue;
            }

            const movieGenres = data.genres.map(genre => genre.name).join(", ");

            const movieStructure = {
                title: data.title || "None data",
                genre: movieGenres || "None data",
                length: data.runtime,
                poster: `https://image.tmdb.org/t/p/w500${data.poster_path}` || "None data",
                release_date: data.release_date || "None data",
                description: data.overview || "None data",
            };

            console.log("Película poblada:", movieStructure);

            await sendMovie(movieStructure);
        }

        console.log("Proceso de población completado.");
    } catch (error) {
        console.error("Error en el proceso de población:", error);
    }
};

populate();

