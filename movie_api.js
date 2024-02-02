const fetch = require('node-fetch');

const MOVIES_API_REQUEST =  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=7&sort_by=popularity.desc'"
const GENRES_API_REQUEST =  "https://api.themoviedb.org/3/genre/movie/list?language=en"
const PROJECT_API = 'https://humble-goggles-694w7779xjx3xr9-3001.app.github.dev'


const getMovies = async () => {
    try {
        const response = await fetch(MOVIES_API_REQUEST, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI1YmFiMDBkZGNkYzdhZTJiYjZiMjg5MmVhZTZlNCIsInN1YiI6IjY1YjY4MjI4MmZhZjRkMDBjOWRjMWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9zmeG3eL_llYOqDbxQS1AHjVg7v0qleM5M83PGF26tA"
            }
        });
        const body = await response.json()
        return body.results
    } catch (error) {
        console.log(error)
    }
}
const getMovie = async (movie_id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI1YmFiMDBkZGNkYzdhZTJiYjZiMjg5MmVhZTZlNCIsInN1YiI6IjY1YjY4MjI4MmZhZjRkMDBjOWRjMWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9zmeG3eL_llYOqDbxQS1AHjVg7v0qleM5M83PGF26tA"
            }
        });
        const body = await response.json()
        if (response.status != 200) {
            console.log(`No se encontró la película: ${movie_id}`, body)
            return {
                success: false
            }
        }
        return {
            success: true,
            data: body
        }
    } catch (error) {
        console.log(error)
    }
}

const getGenres= async () => {
    try {
        const response = await fetch(GENRES_API_REQUEST, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjI1YmFiMDBkZGNkYzdhZTJiYjZiMjg5MmVhZTZlNCIsInN1YiI6IjY1YjY4MjI4MmZhZjRkMDBjOWRjMWNiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9zmeG3eL_llYOqDbxQS1AHjVg7v0qleM5M83PGF26tA"
            }
        });
        const body = await response.json()
        return body.genres
    } catch (error) {
        console.log(error)
    }
}

const sendMovie = async (movie) => {
    try {
        console.log(movie)
        const response = await fetch(PROJECT_API + "/api/movies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-type": "Application/json"
            }
        });
        const body = await response.json()
        console.log("Pelicula agregada: ", body.id, " status: ", response.status)
    } catch (error) {
        console.log(error)
    }
}

const populate = async () => {
    const movies = await getMovies();
    // const genres = await getGenres();
    for (let movie of movies) {
      const { data, success } = await getMovie(movie.id);
      console.log(data.poster_path)
      if (!success) {
        continue;
      }
      let movieGenres = "";
      data.genres.forEach((element) => {
        movieGenres = element.name + " ";
      });
      const movieStructure = {
        title: data.title ?? "None data",
        genre: movieGenres ?? "None data",
        length: data.runtime,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}` ?? "None data",
        release_date: data.release_date.length == 0 ? "None data" : data.release_date,
        actors: "None data",
        description: data.overview ?? "None data",
      };
      sendMovie(movieStructure);
    }
  };


populate()