const fetch = require('node-fetch');


const MOVIES_API_REQUEST = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc";
const GENRES_API_REQUEST = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const PROJECT_API = 'process.env.BACKEND_URL';

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

const getMovie = async (movie_id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });
        const body = await response.json();
        
        if (response.status !== 200) {
            console.error(`No se encontró la película: ${movie_id}`, body);
            return { success: false };
        }
        
        return { success: true, data: body };
    } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
        return { success: false };
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

const sendMovie = async (movie) => {
    try {
        const response = await fetch(`${PROJECT_API}/api/movies`, {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseBody = await response.json();

        console.log(`Película agregada: ${responseBody.id}, Estado: ${response.status}`);
    } catch (error) {
        console.error("Error al enviar la película:", error);
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
                actors: "None data",
                description: data.overview || "None data",
            };

            console.log("Película poblada:", movieStructure);

            // Agrega esta línea para enviar la película a tu API
            await sendMovie(movieStructure);
        }

        console.log("Proceso de población completado.");
    } catch (error) {
        console.error("Error en el proceso de población:", error);
    }
};

populate();
