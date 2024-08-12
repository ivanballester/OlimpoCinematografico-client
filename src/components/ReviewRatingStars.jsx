import React from "react";

function ReviewRatingStars({ review }) {
  const rating = (reviewScore) => {
    if (reviewScore <= 0) {
      return <span>★★★★★</span>;
    } else if (reviewScore === 1) {
      return <span>⭐★★★★</span>;
    } else if (reviewScore === 2) {
      return <span>⭐⭐★★★</span>;
    } else if (reviewScore === 3) {
      return <span>⭐⭐⭐★★</span>;
    } else if (reviewScore === 4) {
      return <span>⭐⭐⭐⭐★</span>;
    } else if (reviewScore >= 5) {
      return <span>⭐⭐⭐⭐⭐</span>;
    }
  };
  return <>{rating(review.rating)}</>;
}

export default ReviewRatingStars;
