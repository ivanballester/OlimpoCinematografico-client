import React, { useEffect, useState } from "react";
import tmdbService from "../service/serviceTMDB";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await tmdbService.get("/movie/popular?language=es-ES");
      const movieList = response.data.results;
      console.log(movieList);
    } catch (error) {
      console.log(error);
    }
  };
  if (!movies) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Peliculas más populares</h2>
      <div></div>
    </div>
  );
}

export default PopularMovies;
