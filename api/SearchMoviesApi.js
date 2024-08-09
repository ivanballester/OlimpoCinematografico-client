import axios from "axios";
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=es-ES&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results; // Return the list of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
