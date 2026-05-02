import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed.length) {
            navigate(`/search?query=${encodeURIComponent(trimmed)}`);
            setSearchTerm("");
        } else {
            navigate("/");
        }
    }

    return(
        <div className="header">
            <div className="headerLeft">
                <Link to="/"> <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" className="header__icon" alt="IMDb logo" /> </Link>
                <Link to="/movies/popular" style={{textDecoration:"none"}}> <span>Popular</span> </Link>
                <Link to="/movies/top_rated" style={{textDecoration:"none"}}> <span>Top Rated</span> </Link>
                <Link to="/movies/upcoming" style={{textDecoration:"none"}}> <span>Upcoming</span> </Link>
            </div>
            <div className="headerRight">
                <form className="searchForm" onSubmit={handleSubmit}>
                    <input
                        className="searchInput"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search movies..."
                    />
                    <button className="searchButton" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default Header