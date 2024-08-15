import React from "react";
import LastReview from "../components/LastReview";
import PopularMovies from "../components/PopularMovies";
import Footer from "../components/Footers";
import portada from "../assets/portada.png";
import Upcoming from "../components/UpcomingMovies";

function HomePage() {
  return (
    <div>
      <img src={portada} alt="" width={"100%"} />
      <hr />
      <div>
        <LastReview />
      </div>

      <br />
      <br />
      <hr />
      <div>
        <PopularMovies />
      </div>
      <br />
      <br />
      <div>
        <Upcoming />
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default HomePage;
