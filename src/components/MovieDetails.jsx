import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import placeholder from "../assets/placeholder.svg";
import Stars from "./ReviewRatingStars";
import service from "../service/service.config";

function MovieDetails({ movie, settings, review, isAdmin, reviewId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewText, setReviewText] = useState(review.text);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await service.patch(`/reviews/${reviewId}`, { text: reviewText });
    } catch (error) {}
  };
  const handleChange = (e) => {
    setReviewText(e.target.value);
  };
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
      <div className="personal-review">
        <strong>Mi crítica personal</strong>
        <Stars review={review} />
        {isEditing ? (
          <textarea
            value={reviewText}
            onChange={handleChange}
            rows="10"
            cols="50"
          />
        ) : (
          <p>{reviewText}</p>
        )}
      </div>
      <div>
        {isAdmin && !isEditing && (
          <>
            <button onClick={handleEdit}>✏️</button>
          </>
        )}
        {isAdmin && isEditing && (
          <>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
