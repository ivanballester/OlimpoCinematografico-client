// ReviewDetails.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../service/service.config";
import tmdbservice from "../service/serviceTMDB";
import { AuthContext } from "../context/auth.context";
import MovieDetails from "../components/MovieDetails";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";
import Footer from "../components/Footers";
import Loading from "../components/Loading";

function ReviewDetails() {
  const { reviewId } = useParams();
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAdmin } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewAndMovie = async () => {
      try {
        const reviewResponse = await service.get(`/reviews/${reviewId}`);
        const reviewData = reviewResponse.data;

        const movieResponse = await tmdbservice.get(
          `/movie/${reviewData.movieId}`,
          {
            params: {
              language: "es-ES",
              append_to_response: "credits",
            },
          }
        );
        const movieData = movieResponse.data;

        const commentResponse = await service.get(
          `/reviews/${reviewId}/comments`
        );
        const commentsData = commentResponse.data;

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

  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );
  if (error) return navigate("/error");

  // Carousel settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
  return (
    <div className="review-details-page">
      <MovieDetails
        movie={movie}
        settings={settings}
        review={review}
        isAdmin={isAdmin}
        reviewId={reviewId}
      />
      <div className="comments-container">
        <Comments
          comments={comments}
          user={user}
          isAdmin={isAdmin}
          handleDeleteComment={handleDeleteComment}
        />

        <div>
          <CommentForm reviewId={reviewId} onCommentAdded={addComment} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ReviewDetails;
