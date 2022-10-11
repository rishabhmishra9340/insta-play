import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import Carousel from "./Carousel/Carousel";
import style from "./style.css";
import { Link } from "react-router-dom";
// import CPagination from "./CPagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../src/images/logo.png";
import CPagination from "./Pagination/CPagination";

let API_key = "&api_key=461182fa2668493a72758c55a1789c35";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
console.log(url);

// https://api.themoviedb.org/3/movie/550?api_key=461182fa2668493a72758c55a1789c35

const Main = () => {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  }, [url_set]);

  const searchMovie = (evt) => {
    url =
      base_url +
      "/search/movie?api_key=461182fa2668493a72758c55a1789c35&query=" +search;
  
    setUrl(url);
    setSearch(" ");
  };

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=461182fa2668493a72758c55a1789c35&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchTrending();
    }, 100);
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const pageNumber = (i) => {
    setPage(i);
  };

  console.log(page, " from goto current page ");

  return (
    <div className="container-fluid">
      <div className="main-fluid">
        <div className="header">
          <div className="movie-nav-logo">
            <img src={logo}></img>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search movies..."
              className="search-input"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            ></input>
            <button className="btn btn-primary" onClick={searchMovie}>
              <span class="fa fa-search"></span>
            </button>
            <Link to="/">
              <button className="nav-btn">Logout</button>
            </Link>
          </div>
        </div>

        <Carousel />

        <div>
          <h1 id="head-txt">Trending</h1>
        </div>

        <div className="container">
          {movieData.length == 0 ? (
            <p className="notfound">Not Found</p>
          ) : (
            content.map((res) => {
              return <Card info={res} />;
            })
          )}
        </div>
        <div>
          <CPagination
            prevPage={prevPage}
            nextPage={nextPage}
            goToCurrentPage={pageNumber}
          />
        </div>
      </div>
    </div>
  );
};
export default Main;
