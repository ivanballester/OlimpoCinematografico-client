import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import placeholder from "../assets/placeholder.svg";
import Stars from "./ReviewRatingStars";

function MovieDetails({ movie, settings, review, isAdmin }) {
  const handleEdit = () => {};
  return (
    <div className="movie-details">
      <div className="title-sinopsis">
        <h1 className="details-title">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster2"
        />
        <p>
          <strong>Sinopsis</strong>
        </p>
        {movie.overview}
      </div>
      <h2>Reparto</h2>
      <Slider {...settings}>
        {movie.credits.cast.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : `${placeholder}`
              }
              alt={actor.name}
              className="actor-photo"
            />
            <p>
              <strong>{actor.name}</strong>
            </p>
            <p>{actor.character}</p>
          </div>
        ))}
      </Slider>
      <p className="personal-review">
        <strong>Mi crítica personal</strong>
        <Stars review={review} />
        {review.text}
      </p>
      <div>
        {isAdmin && <button onClick={handleEdit}>Editar</button>}
        {isAdmin && <button>Borrar</button>}
      </div>
    </div>
  );
}

export default MovieDetails;
