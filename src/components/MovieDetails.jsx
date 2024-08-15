import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import placeholder from "../assets/placeholder.svg";
import Stars from "./ReviewRatingStars";
import service from "../service/service.config";
import { useNavigate } from "react-router-dom";

function MovieDetails({ movie, settings, review, isAdmin, reviewId }) {
  const navigate = useNavigate();
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
  const handleDeleteBtn = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas borrar esta reseña?"
    );

    if (confirmDelete) {
      try {
        await service.delete(`/reviews/${reviewId}`);
        navigate("/reviews");
      } catch (error) {
        setError("No se puede borrar esta reseña");
      }
    }
  };

  return (
    <div className="movie-details" style={{ textAlign: "center" }}>
      <h1
        className="homepage-title2"
        style={{ fontSize: "1.7rem", marginBottom: "15px" }}
      >
        {movie.title}
      </h1>

      <div className="title-sinopsis">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster2"
        />
        <div className="sinopsis">
          <h2 className="title-details" style={{ marginBottom: "0" }}>
            Sinopsis
          </h2>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
      <h2 className="title-details">Reparto</h2>
      <Slider {...settings}>
        {movie.credits.cast.map((actor) => (
          <div key={actor.id} className="card">
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
      <div className="review-general">
        <div className="personal-review">
          <span style={{ fontWeight: "bold", marginTop: "30px" }}>
            Mi crítica personal
          </span>

          <Stars review={review} />
          {isEditing ? (
            <textarea
              value={reviewText}
              onChange={handleChange}
              rows="10"
              cols="50"
            />
          ) : (
            <p style={{ textAlign: "justify" }}>{reviewText}</p>
          )}
        </div>
        <div>
          {isAdmin && !isEditing && (
            <div className="delete-edit">
              <button onClick={handleEdit} className="detailsBtn">
                ✏️
              </button>
              <button onClick={handleDeleteBtn} className="detailsBtn">
                ❌
              </button>
            </div>
          )}
          {isAdmin && isEditing && (
            <div>
              <button onClick={handleSave} className="detailsBtn">
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="detailsBtn"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
