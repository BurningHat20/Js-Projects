document.addEventListener("DOMContentLoaded", function () {
  fetchMovies();
});

async function fetchMovies() {
  try {
    const response = await fetch(
      "http://www.omdbapi.com/?s=avengers&apikey=27e35080"
    ); // Replace with your actual API key
    const data = await response.json();

    if (data.Response === "True") {
      const movies = data.Search;
      const movieListContainer = document.getElementById("movie-list");

      movies.forEach((movie) => {
        fetchMovieDetails(movie.imdbID)
          .then((movieDetails) => {
            const card = createMovieCard(movie, movieDetails);
            movieListContainer.appendChild(card);
          })
          .catch((error) =>
            console.error("Error fetching movie details:", error)
          );
      });
    } else {
      console.error("Error fetching movies:", data.Error);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=27e35080&plot=full`
    ); // Replace with your actual API key
    const data = await response.json();

    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

function createMovieCard(movie, details) {
  const { Title, Poster, Year } = movie;
  const imdbRating = details.imdbRating || "N/A";
  const runtime = details.Runtime || "N/A";
  const genres = details.Genre || "N/A";

  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src =
    Poster !== "N/A" ? Poster : "https://via.placeholder.com/250x350.png";
  image.alt = Title;

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const title = document.createElement("div");
  title.classList.add("movie-title");
  title.textContent = Title;

  const rating = document.createElement("div");
  rating.classList.add("rating");
  rating.textContent = `Rating: ${imdbRating}`;

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("details");
  detailsContainer.innerHTML = `<span>${runtime}</span> | <span>${Year}</span>`;

  const genresElement = document.createElement("div");
  genresElement.classList.add("genres");
  genresElement.textContent = `Genres: ${genres}`;

  cardContent.appendChild(title);
  cardContent.appendChild(rating);
  cardContent.appendChild(detailsContainer);
  cardContent.appendChild(genresElement);

  card.appendChild(image);
  card.appendChild(cardContent);

  return card;
}
