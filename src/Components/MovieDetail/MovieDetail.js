import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movie.css";
import { Link } from "react-router-dom";
import playbtn from "../../images/playbtn.png"
import Iframe from "../Iframes/Iframe";

const MovieDetail = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();
  const [play, setPlay] = useState(false)

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=461182fa2668493a72758c55a1789c35&language=en-US`

    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
      console.log(currentMovieDetail);
  };

  return (
    <div className="container-1">
      <div className="detail">
        <div className="back-to-home">
          <Link to="/main">
            {" "}
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
          </Link>{" "}
        </div>
        <div className="movie__name">
          {currentMovieDetail ? currentMovieDetail.original_title : ""}
        </div>
        <div className="movie__rating">
          {currentMovieDetail ? currentMovieDetail.vote_average / 2 : ""}/5{" "}
          <i class="fa fa-star checked" />
        </div>
        <div className="overview">
          {currentMovieDetail ? currentMovieDetail.overview : ""}
        </div>
        <div className="movie__releaseDate">
          {currentMovieDetail
            ? "Release date: " + currentMovieDetail.release_date
            : ""}
          <div>
            Original Language{" "}
            {currentMovieDetail ? currentMovieDetail.original_language : ""}
          </div>
        </div>
      </div>
      <div className="poster">
       
        <img src={playbtn} id='play-btn'  onClick={()=>setPlay(true)}></img>
 
        <img
         
          className="img"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
                  
               
            <div className='iframe' >

            {play ? <Iframe id={id} onClick={()=>setPlay(false)} /> : ""}
            </div>
      </div>

  );
};

export default MovieDetail;
