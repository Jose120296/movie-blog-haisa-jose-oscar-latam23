const fetch = require('node-fetch');


const MOVIES_API_REQUEST = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=7&sort_by=popularity.desc";
const GENRES_API_REQUEST = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const PROJECT_API = 'https://humble-goggles-694w7779xjx3xr9-3001.app.github.dev';

const API_KEY = "8625bab00ddcdc7ae2bb6b2892eae6e4"; // Reemplazar con tu clave de API de TMDb

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

            await sendMovie(movieStructure);
        }

        console.log("Proceso de población completado.");
    } catch (error) {
        console.error("Error en el proceso de población:", error);
    }
};

populate();
