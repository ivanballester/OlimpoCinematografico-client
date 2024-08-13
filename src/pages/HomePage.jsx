import React from "react";
import LastReview from "../components/LastReview";
import PopularMovies from "../components/PopularMovies";

function HomePage() {
  return (
    <div>
      <div>
        <h1>Mi ultima publicación</h1>
        <LastReview />
      </div>
      <hr />
      <div>
        <PopularMovies />
      </div>
    </div>
  );
}

export default HomePage;
