import React from "react";
import LastReview from "../components/LastReview";
import PopularMovies from "../components/PopularMovies";
import Footer from "../components/Footers";
function HomePage() {
  return (
    <div>
      <div>
        <LastReview />
      </div>
      <hr />
      <div>
        <PopularMovies />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default HomePage;
