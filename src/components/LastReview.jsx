import React, { useEffect, useState } from "react";
import service from "../service/service.config";
import tmdb from "../service/serviceTMDB";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function LastReview() {
  const [lastMovieId, setLastMovieId] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getLastReview();
        await fetchMovieDetails();
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lastMovieId]);

  const getLastReview = async () => {
    try {
      const response = await service.get("/reviews");
      const reviews = response.data;
      const lastReview = reviews[reviews.length - 1];
      setLastMovieId(lastReview.movieId);
      setReviewId(lastReview._id);
    } catch (error) {
      setError(error.message || "Failed to fetch last review.");
    }
  };

  const fetchMovieDetails = async () => {
    if (lastMovieId === null) return;

    try {
      const response = await tmdb.get(`/movie/${lastMovieId}`, {
        params: { language: "es-ES" },
      });
      const movieDetails = response.data;
      setMovieData(movieDetails);
    } catch (error) {
      setError(error.message || "Failed to fetch last review.");
    }
  };
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      {movieData && (
        <div className="last-review">
          <h1 className="homepage-title">MI ÚLTIMA PUBLICACIÓN</h1>
          <h2 className="homepage-title2">{movieData.title}</h2>
          <p>{movieData.overview}</p>
          <Link to={`/reviews/${reviewId}`}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`}
              alt={movieData.title}
              className="lastReview-img"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default LastReview;
