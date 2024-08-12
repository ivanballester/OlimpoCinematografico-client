import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import placeholder from "../assets/placeholder.svg";
import CommentForm from "../components/CommentForm";
import service from "../service/service.config";
import { AuthContext } from "../context/auth.context";

function ReviewDetails() {
  const { reviewId } = useParams();
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviewAndMovie = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Fetch review data from the backend
        const reviewResponse = await service.get(`/reviews/${reviewId}`);
        const reviewData = reviewResponse.data;

        // Fetch movie details from TMDB using movieId from review data
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${reviewData.movieId}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=es-ES&append_to_response=credits`
        );
        const movieData = movieResponse.data;

        // Fetch review comments
        const commentResponse = await service.get(
          `/reviews/${reviewId}/comments`
        );
        const commentsData = commentResponse.data;
        console.log(commentsData);
        setReview(reviewData);
        setMovie(movieData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewAndMovie();
  }, [reviewId]);

  const addComment = async (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    try {
      const commentResponse = await service.get(
        `/reviews/${reviewId}/comments`
      );
      setComments(commentResponse.data);
    } catch (error) {
      console.error("Error fetching updated comments:", error);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await service.delete(`/comments/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

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
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="review-details-page">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster2"
      />
      <p>
        <strong>Sinopsis</strong>
      </p>
      {movie.overview}
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
      <p>
        <strong>Mi critica personal</strong> <br />
        {review.text}
      </p>
      <p>
        <strong>Rating</strong> {review.rating}
      </p>

      <h3>Comentarios</h3>
      <div>
        {comments.map((comment, index) => {
          {
            console.log(comment);
          }
          return (
            <div key={index} className="comment">
              <p style={{ display: "flex", alignItems: "center" }}>
                <strong>{comment.creator?.name || "Unknown User"}</strong>
              </p>
              <p>{comment.text}</p>
              {(comment.creator?._id === user || isAdmin) && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      <CommentForm reviewId={reviewId} onCommentAdded={addComment} />
    </div>
  );
}

export default ReviewDetails;
