import React, { useEffect, useState } from "react";
import tmdbService from "../service/serviceTMDB";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loading from "./Loading";

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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (!movies)
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="homepage-title">PRONTO EN CINES</h1>
      <div>
        <Slider {...settings}>
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="card">
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
