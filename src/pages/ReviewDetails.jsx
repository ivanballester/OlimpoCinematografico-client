import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ReviewDetails() {
  const { reviewId } = useParams(); // Retrieve the reviewId from URL params
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewAndMovie = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch review data from the backend
        const reviewResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewData = reviewResponse.data;

        // Fetch movie details from TMDB using movieId from review data
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${reviewData.movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=es-ES&append_to_response=credits`
        );
        const movieData = movieResponse.data;

        setReview(reviewData);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewAndMovie();
  }, [reviewId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="review-details-page">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <p>Sinopsis</p> {movie.overview}
      <p>
        <strong>Critica</strong> {review.text}
      </p>
      <p>
        <strong>Rating</strong> {review.rating}
      </p>
      <h2>Actores</h2>
      <Slider {...settings}>
        {movie.credits.cast.map((actor) => (
          <div key={actor.id} className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
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
      <h2>Comentarios...</h2>
    </div>
  );
}

export default ReviewDetails;
