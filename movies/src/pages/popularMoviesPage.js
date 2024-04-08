import React from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const PopularMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('popularmovies', getPopularMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const popularmovies = data.results;


  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={popularmovies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};
export default PopularMoviesPage;