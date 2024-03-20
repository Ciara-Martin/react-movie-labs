import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcoming } from "../api/tmdb-api";

const UpcomingMoviesPage = (props) => {
    const [upcoming, setUpcoming] = useState([]);
    const favorites = upcoming.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  
  
    useEffect(() => {
      getUpcoming().then(upcoming => {
        setUpcoming(upcoming);
      });
    }, []);

    const addToFavorites = (movieId) => {
        const updatedMovies = upcoming.map((m) =>
          m.id === movieId ? { ...m, favorite: true } : m
        );
        setUpcoming(updatedMovies);
      };
    
  
    return (
      <PageTemplate
        title='Discover Upcoming Movies'
        movies={upcoming}
        selectFavorite={addToFavorites}
      />
    );
  };
  export default UpcomingMoviesPage;