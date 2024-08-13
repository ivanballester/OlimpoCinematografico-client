import React, { useEffect, useState } from "react";
import tmdbService from "../service/serviceTMDB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
      setMovies(movieList);
    } catch (error) {
      console.log(error);
    }
  };
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  if (!movies) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Peliculas más populares</h2>
      <div>
        <Slider {...settings}>
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="movie-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : `${placeholder}`
                  }
                  alt={movie.title}
                  className="movie-photo"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default PopularMovies;
