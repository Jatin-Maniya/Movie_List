import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../../components/card/card";
import "./search.css";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Search = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = useQuery().get("query") || "";

    useEffect(() => {
        if (!query.trim()) {
            setMovies([]);
            setError(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Unable to fetch search results. Please try again.");
                setLoading(false);
            });
    }, [query]);

    return (
        <div className="searchPage">
            <h2 className="searchTitle">Search results</h2>
            {!query.trim() ? (
                <p className="searchMessage">Type a movie title in the search box.</p>
            ) : loading ? (
                <p className="searchMessage">Loading results for "{query}"...</p>
            ) : error ? (
                <p className="searchMessage error">{error}</p>
            ) : movies.length === 0 ? (
                <p className="searchMessage">No results found for "{query}".</p>
            ) : (
                <div className="searchResults">
                    {movies.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
