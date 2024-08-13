import React from "react";
import LastReview from "../components/LastReview";
import PopularMovies from "../components/PopularMovies";
import Footer from "../components/Footers";
import portada from "../assets/portada.png";

function HomePage() {
  return (
    <div>
      <img src={portada} alt="" width={"100%"} />
      <hr />
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
