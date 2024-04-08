import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getWatchlist } from "../api/tmdb-api";
import Spinner from '../components/spinner';

const WatchlistPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["watchlist", { id: movieId }],
        queryFn: getWatchlist,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchlistQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const watchlist = watchlistQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcoming}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
);
};