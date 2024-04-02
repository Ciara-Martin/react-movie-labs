import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getUpcoming } from "../api/tmdb-api";
import Spinner from "../components/spinner";

    const UpcomingMoviesPage = () => {
      const { data: upcoming, isLoading, isError, error } = useQuery(
        "upcomingMovies",
        getUpcoming
      );
  
      const addToFavorites = (movieId) => {
        // Logic to add movie to favorites
        console.log("Adding movie to favorites:", movieId);
      };

      if (isLoading) {
        return <Spinner />;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
    
      return (
        <PageTemplate
          title="Discover Upcoming Movies"
          movies={upcoming}
          selectFavorite={addToFavorites}
        />
      );
    };
    
    export default UpcomingMoviesPage;