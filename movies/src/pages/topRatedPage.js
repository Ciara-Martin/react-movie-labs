import React from "react";
import { getTopRated } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const TopRatedPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('toprated', getTopRated)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const toprated = data.results;


  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={toprated}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};
export default TopRatedPage;