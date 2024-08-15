import React, { useEffect, useState } from "react";
import tmdbService from "../service/serviceTMDB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await tmdbService.get("/movie/upcoming?language=es-ES");
      const movieList = response.data.results;

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
      <h1 className="homepage-title">PRONTO...</h1>
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
                  style={{ height: "300px" }}
                />
                <p style={{ textAlign: "center", color: "#f9c54d" }}>
                  {movie.release_date}
                </p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default Upcoming;
