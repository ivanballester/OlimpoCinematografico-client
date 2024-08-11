import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ReviewDetailsPage() {
  const location = useLocation();
  const { reviewId, movieId } = location.state || {};
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review details:", error);
        setError("An error occurred while fetching review details.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="review-details-page">
      {review && (
        <div>
          <h1>{review.movieTitle}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w200${review.moviePoster}`}
            alt={review.movieTitle}
          />
          <h2>Review</h2>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
          <p>Reviewed by: {review.creator}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewDetailsPage;
